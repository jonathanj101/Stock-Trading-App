import os
import json
import base64
import requests
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/<string:name>', methods=['GET'])
def main(name):
    return "<h1>hello {}</h1>".format(name)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=int(os.environ.get("PORT", 5000)))
