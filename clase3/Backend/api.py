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
            return jsonify( text =  "<p>Disculpa no te entendi, ¿Podrias repetirlo?</p>")

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
            text = "<p>Disculpa no te entendi, ¿Podrias repetirlo?</p>"
        else:
            numerorespuesta = random.randint(0,cursor.count()-1)
            text = cursor[numerorespuesta]["respuesta"]

        SEED_DATA = [
            { 'intent': intent, 'mensaje': request.json["message"], 'entities': entityBD }]

        mensajes_usuario.insert_many(SEED_DATA)
        client.close()

        return jsonify( text = text)

api.add_resource(GET_MESSAGE, '/getMessage')  # Route_1

@app.route('/webhook', methods=['POST'])
def respond():
    print(request.json)
    return Response(status=200)

api.add_resource(respond, '/webhook')

if __name__ == '__main__':s
    app.run(port='4000')
