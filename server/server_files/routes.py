import os
import json
import base64
import requests
from datetime import datetime
from flask import jsonify, request, render_template, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from server_files import app, db, bcrypt
from server_files.models import Users, Transactions, Stock

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
    print(name)

    search_url = "{}/stable/stock/{}/quote?token={}".format(
        base_url, name, api_key)

    req = requests.get(search_url)

    resp = req.json()

    stock_data = {
        "company_name": resp["companyName"],
        "cost": resp["latestPrice"],
        "change": resp["change"],
        "symbol": resp["symbol"]
    }

    return jsonify({"data": stock_data})


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


@app.route('/signup', methods=["POST"])
def signup():
    user_details = request.get_json()
    filter_user_model_by_username = Users.query.filter_by(
        username=user_details['username']).first()
    hashed_password = bcrypt.generate_password_hash(
        user_details['password']).decode('utf-8')
    print(hashed_password)

    # print(filter_user_model_by_username)
    # if filter_user_model_by_username is None:
    #     user = Users(first_name=user_details['first_name'], last_name=user_details['last_name'],
    #                  email=user_details['email'], username=user_details['username'], password=user_details['password'])
    #     db.session.add(user)
    #     db.session.commit()
    #     return jsonify("Success! You will be redirect to your account shortly!", 200)
    # else:
    #     return jsonify("The username has already been used! Please choose another username!", 500)


@app.route('/login', methods=["POST"])
def login():
    user = request.get_data()
    print(user)
    # user = User.query.filter_by(email=)
    return jsonify('ok')
