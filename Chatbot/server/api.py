# API
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

assistant_api_key = os.getenv("assistant_api_key")


class GET_MESSAGE(Resource):
    def post(self):

        return jsonify( este_es_el_mensaje = request.json["message"])


api.add_resource(GET_MESSAGE, '/getMessage')  # Route_1

if __name__ == '__main__':
    app.run(port='5002')
