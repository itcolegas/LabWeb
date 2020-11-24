# API
import sys
import pymongo
import random

import os
import json
import logging
import requests

import flask
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from dotenv import load_dotenv
from flask_api import status

from jsonschema import validate, ValidationError
from ibm_watson import AssistantV2, ApiException
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from flask import jsonify
from twilio.rest import Client

load_dotenv()

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

request_data = {}

uri = "mongodb+srv://admin:Sabrina1998@cluster0.ajf2k.mongodb.net/cluster0?retryWrites=true&w=majority"

def watson_create_session():

    iam_apikey = os.getenv("assistant_api_key")
    assistant_url = os.getenv("assistant_url")
    assistant_version = os.getenv('assistant_version')

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)

    try:
        watson_session = assistant.create_session(
            assistant_id=os.getenv("assistant_id")
        ).get_result()
        watson_session_id = watson_session["session_id"]
    except KeyError:
        _logger.error("The session wasn't created")
        return jsonify({"error": "Error creating the session"}), status.HTTP_503_SERVICE_UNAVAILABLE

    return watson_session_id

def watson_response(session_id, message):

    iam_apikey = os.getenv("assistant_api_key")
    assistant_url = os.getenv("assistant_url")
    assistant_version = os.getenv('assistant_version')

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)
    context = request_data.get('context') if 'context' in request_data else {}
    watson_session_id = session_id

    try:
        watson_response = assistant.message(
            assistant_id=os.getenv('assistant_id'),
            session_id=watson_session_id,
            input={
                'message_type': 'text',
                'text': message,
                'options': {
                    'return_context': True
                }
            },
            context=context
        ).get_result()
    except ValueError as ex:
        _logger.error("Value error: %s", ex)
        return jsonify({'error': "Value error"}), status.HTTP_500_INTERNAL_SERVER_ERROR
    except ApiException:
        try:
            watson_session = assistant.create_session(
                assistant_id=os.getenv("assistant_id")
            ).get_result()
            watson_session_id = watson_session["session_id"]

            watson_response = assistant.message(
                assistant_id=os.getenv('assistant_id'),
                session_id=watson_session_id,
                input={
                    'message_type': 'text', #Aqui va el componente de react
                    'text': request_data.get('input_message'),
                    'options': {
                        'return_context': True
                    }
                },
                context=context
            ).get_result()
        except KeyError:
            _logger.error("The session wasn't created")
            return jsonify({"error": "Error creating the session"}), status.HTTP_503_SERVICE_UNAVAILABLE

    try:
        del watson_response["context"]["global"]["session_id"]
    except:
        pass
    response = {
        "response": watson_response,
        "session_id": watson_session_id
    }

    return response #puedes hacerlo con puntoget

def watson_instance(iam_apikey: str, url: str, version: str = "2019-02-28") -> AssistantV2:
    try:
        authenticator = IAMAuthenticator(iam_apikey)
        assistant = AssistantV2(
            authenticator=authenticator,
            version=version
        )
        assistant.set_service_url(url)
    except ApiException as error:
        _logger.error("%s - %s", error.code, error.message)
        return jsonify({'error': str(error.message)}), error.code

    return assistant
session = watson_create_session()
class GET_MESSAGE(Resource):
    def post(self):

        print("El mensaje del usuario es : "+request.json["message"]+".")
        resp = watson_response(session,request.json["message"])

        if not resp["response"]["output"]["intents"]:
            return jsonify( text =  "<p>Sigo aprendiendo para entender eso. ¿Podrías intentarlo de otra forma? :)</p>")

        print("El intent de watson es : "+resp["response"]["output"]["intents"][0]["intent"]+".")
        intent = resp["response"]["output"]["intents"][0]["intent"]

        client = pymongo.MongoClient(uri)
        db = client.get_default_database()
        mensajes_usuario = db['mensajes_usuario']
        respuestas_bd = db['respuestasBalooBot']

        if not resp["response"]["output"]["entities"]:
            entityBD = ""
        else:
            entityBD = resp["response"]["output"]["entities"][0]["value"]
            print("La entity es : "+entityBD)

        if entityBD:
            cursor = respuestas_bd.find({'intent': intent,'entity': entityBD })
        else:
            cursor = respuestas_bd.find({'intent': intent, 'entity': ''})

        if cursor.count() == 0:
            text = "<p>Sigo aprendiendo para entender eso. ¿Podrías intentarlo de otra forma? :)</p>"
        else:
            numerorespuesta = random.randint(0,cursor.count()-1)
            text = cursor[numerorespuesta]["respuesta"]

        SEED_DATA = [
            { 'intent': intent, 'mensaje': request.json["message"], 'entities': entityBD }]

        mensajes_usuario.insert_many(SEED_DATA)
        client.close()
        print(" --- PAYLOAD A FRONTEND ----")
        print(jsonify( text = text, intent = intent).data)

        return jsonify( text = text, intent = intent, entity = entityBD)

class GET_MESSAGEWA(Resource):
    def post(self):

        #TWILIO
        number = request.form['From']
        message_body = request.form['Body']

        print(request.form)

        account_sid = os.getenv("whatsapp_sid")
        auth_token = os.getenv("whatsapp_secret")
        mapbox_token = os.getenv("mapbox_token")

        clientwa = Client(account_sid, auth_token)

        #MONGODB
        client = pymongo.MongoClient(uri)
        db = client.get_default_database()
        mensajes_usuario = db['mensajes_usuario']
        respuestas_bd = db['respuestasBalooBot']

        try:
            latitude, longitude = request.form['Latitude'], request.form['Longitude']

            location = requests.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+longitude+'%2C'+latitude+'.json?access_token='+mapbox_token)

            location = location.json()

            place = location['features'][0]['context'][1]['text']
            print(place)

            SEED_DATALL = [
                { 'place': place, 'location': location['features'][0]['place_name'],'longitude': longitude, 'latitude': latitude }]

            mensajes_usuario.insert_many(SEED_DATALL)

            randomcost = random.randint(110.00,250.00)
            print(randomcost)
            #Aquí va el mensaje
            print('Tu dirección es: ', location['features'][0]['place_name'])
            message = clientwa.messages.create(
              from_='whatsapp:+14155238886',
              body= 'El costo estimado a tu dirección: ' + location['features'][0]['place_name'] + '\nEs $'+str(randomcost)+' pesos.\nPara más información del envío contactar a un agente: contacto@flemet.com.mx',
              to=number
            )

        except:

            #WATSON
            print("El mensaje del usuario de whastapp es : "+message_body+".")
            resp = watson_response(session,message_body)

            if len(resp["response"]["output"]["intents"]) == 0:
                text = "Sigo aprendiendo para entender eso. ¿Podrías intentarlo de otra forma? :)"
                message = clientwa.messages.create(
                  from_='whatsapp:+14155238886',
                  body=text,
                  media_url = ['https://s3-eu-west-1.amazonaws.com/userlike-cdn-blog/do-i-need-a-chatbot/header-chat-box.png'],
                  to=number
                )
                return

            intent = resp["response"]["output"]["intents"][0]["intent"]
            print("El intent de watson es : "+intent+".")

            #MONGODB

            if not resp["response"]["output"]["entities"]:
                entityBD = ""
            else:
                entityBD = resp["response"]["output"]["entities"][0]["value"]
                print("La entity es : "+entityBD)

            if entityBD:
                cursor = respuestas_bd.find({'intent': intent,'entity': entityBD })
            else:
                cursor = respuestas_bd.find({'intent': intent, 'entity': ''})

            if cursor.count() == 0:
                if intent == 'Cotizador':
                    text = "Aún estoy aprendiendo a cotizar, te envío un pdf con nuestros costos. \nTambién puedes mandarme tu ubicación para conocer el costo de envío a tu dirección."
                    message = clientwa.messages.create(
                      from_='whatsapp:+14155238886',
                      body= "Tarifario.pdf",
                      media_url = ['https://uploadpie.com/FgAJsY'],
                      to=number
                    )
                else:
                    text = "Sigo aprendiendo para entender eso. ¿Podrías intentarlo de otra forma? :)"
            else:
                numerorespuesta = random.randint(0,cursor.count()-1)
                text = cursor[numerorespuesta]["respuestaWA"]

            SEED_DATA = [
                { 'intent': intent, 'mensajeWA': message_body, 'entities': entityBD }]

            mensajes_usuario.insert_many(SEED_DATA)
            client.close()

            #TWILIO
            if intent == 'Bienvenida':
                message = clientwa.messages.create(
                  from_='whatsapp:+14155238886',
                  body= text.replace("-nl-","\n"),
                  to=number
                )
                message = clientwa.messages.create(
                  from_='whatsapp:+14155238886',
                  body= 'Si quieres conocer el costo de envío a tu dirección puedes mandarme tu ubicación.',
                  to=number
                )
                message = clientwa.messages.create(
                  from_='whatsapp:+14155238886',
                  body= '😄',
                  to=number
                )
            else:
                message = clientwa.messages.create(
                  from_='whatsapp:+14155238886',
                  body= text.replace("-nl-","\n"),
                  to=number
                )

api.add_resource(GET_MESSAGE, '/getMessage')  # Route_1
api.add_resource(GET_MESSAGEWA, '/getMessageWa')  # Route_2

if __name__ == '__main__':
    app.run(port='4000')
