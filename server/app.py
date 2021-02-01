import os
import json
import base64
import requests
from flask import Flask, jsonify

app = Flask(__name__)

api_key = os.environ.get('API_KEY')

base_url = "https://cloud.iexapis.com"


@app.route('/', methods=['GET'])
def main():
    # version = "/stable"
    # symbol = "/IBM/financials"
    # endpoint = "/stock"
    # token = "?token={}".format(api_key)

    # search_url = "{}{}{}/batch/{}{}".format(
    #     base_url, version, endpoint, symbol, token)
    # print(search_url)

    search_url = "https://cloud.iexapis.com/stable/stock/aapl/quote?token={}".format(
        api_key)

    return jsonify({"response": search_url})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=int(os.environ.get("PORT", 5000)))
