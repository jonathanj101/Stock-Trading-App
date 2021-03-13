import os
import json
import base64
import requests
from datetime import datetime
from flask import jsonify, request, render_template, redirect, url_for
from server_files import app
from server_files.models import User, Transactions

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
        "cost": resp["latestPrice"],
        "change": resp["change"],
    }

    return jsonify(test_list)


@app.route('/testing/<string:name>', methods=['GET'])
def testing(name):
    f = 'f'
    f2 = 'fb'
    # search_url = "{}/stable/stock/{}/quote?token={}".format(
    #     base_url, f, api_key)
    # print(search_url)
    search_url = "{}/stable/stock/market/batch?symbols={}&types=quote&token={}".format(
        base_url, f, api_key)
    search_url2 = "{}/stable/stock/market/batch?symbols={}&types=quote&token={}".format(
        base_url, f2, api_key)

    req = requests.get(search_url)
    req2 = requests.get(search_url2)

    resp = req.json()
    resp2 = req2.json()

    print(name)

    print(resp)
    print(resp2)

    response = {
        "url": search_url,
        "req": req,
        "resp": resp
    }

    # return jsonify({"data": response})
    return "ok"


@app.route("/multiple", methods=["GET"])
def multiple():
    tesla = "tsla"
    apple = "aapl"
    fb = "fb"
    qcom = "qcom"
    microsft = "msft"
    sony = 'sne'
    american_airline = "aal"

    search_url = "{}/stable/stock/market/batch?symbols={},{},{},{},{},{},{}&types=quote&token={}".format(
        base_url, tesla, apple, fb, qcom, microsft, sony, american_airline, api_key)

    req = requests.get(search_url)

    resp = req.json()

    stocks_data = [
        {
            "company_name": resp['AAPL']["quote"]["companyName"],
            "symbol": resp['AAPL']["quote"]["symbol"],
            "latestPrice": resp['AAPL']["quote"]["latestPrice"],
            "change": resp['AAPL']["quote"]["change"],
        },
        {
            "company_name": resp['TSLA']["quote"]["companyName"],
            "symbol": resp['TSLA']["quote"]["symbol"],
            "latestPrice": resp['TSLA']["quote"]["latestPrice"],
            "change": resp['TSLA']["quote"]["change"]
        },

        {
            "company_name": resp['FB']["quote"]["companyName"],
            "symbol": resp['FB']["quote"]["symbol"],
            "latestPrice": resp['FB']["quote"]["latestPrice"],
            "change": resp['FB']["quote"]["change"]
        },

        {
            "company_name": resp['AAL']["quote"]["companyName"],
            "symbol": resp['AAL']["quote"]["symbol"],
            "latestPrice": resp['AAL']["quote"]["latestPrice"],
            "change": resp['AAL']["quote"]["change"]
        },

        {
            "company_name": resp['MSFT']["quote"]["companyName"],
            "symbol": resp['MSFT']["quote"]["symbol"],
            "latestPrice": resp['MSFT']["quote"]["latestPrice"],
            "change": resp['MSFT']["quote"]["change"]
        },

        {
            "company_name": resp['QCOM']["quote"]["companyName"],
            "symbol": resp['QCOM']["quote"]["symbol"],
            "latestPrice": resp['QCOM']["quote"]["latestPrice"],
            "change": resp['QCOM']["quote"]["change"]
        },

        {
            "company_name": resp['SNE']["quote"]["companyName"],
            "symbol": resp['SNE']["quote"]["symbol"],
            "latestPrice": resp['SNE']["quote"]["latestPrice"],
            "change": resp['SNE']["quote"]["change"]
        },
    ]

    return jsonify({"data": stocks_data})


@app.route('/submit_form', methods=["POST"])
def submit_form():
    # user = User(request.form['email'], request.form['email'])
    print(request.data)
    # transactions = Transactions(250)
    # db.session.add(user)
    # db.session.add(transactions)
    # db.session.commit()
    # return redirect(url_for('testing_tutorial'))
    return jsonify({'msg': 'ok'})
