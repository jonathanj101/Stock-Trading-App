import os
import json
import base64
import requests
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/', methods=['GET'])
def main():
    return "<h1>Hello World</h1>"


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True,
            port=int(os.environ.get("PORT", 5000)))
