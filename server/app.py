import os
import json
import base64
import requests
from flask import Flask, jsonify

app = Flask(__name__)

api_key = os.environ.get('API_KEY')

base_url = "https://cloud.iexapis.com"


@app.route('/testing_data', methods=['GET'])
def main():

    tesla = "Tsla"
    apple = "aapl"
    search_url = "{}/stable/stock/{}/quote?token={}".format(
        base_url, tesla, api_key)

    req = requests.get(search_url)

    resp = req.json()

    test_list = {
        "company_name": resp["companyName"],
        "symbol": resp["symbol"],
        "open": resp["open"],
        "close": resp["close"],
        "high": resp["high"],
        "low": resp["low"]
    }

    return jsonify(test_list)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=int(os.environ.get("PORT", 5000)))
