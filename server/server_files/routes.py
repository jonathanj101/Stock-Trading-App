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


@app.route("/multiple_stocks", methods=["GET"])
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


@app.route("/search_stock/<string:stock>", methods={'GET'})
def search_stock(stock):

    search_url = "{}/stable/stock/{}/quote?token={}".format(
        base_url, stock, api_key)
    req = requests.get(search_url)
    resp = req.json()
    stock_data = {
        "company_name": resp["companyName"],
        "cost": resp["latestPrice"],
        "change": resp["change"],
        "symbol": resp["symbol"]
    }
    return jsonify({"data": stock_data})


@app.route('/add_stock', methods=['POST'])
def add_stock():
    user_detail = request.get_json()

    filter_by_id = Users.query.filter_by(id=user_detail['id']).first()
    if filter_by_id:
        filter_by_stock_symbol = Stock.query.filter_by(
            stock_symbol=user_detail['stockSymbol']).first()
        if filter_by_stock_symbol != None:
            print("line 115 {}".format(filter_by_stock_symbol.stock_symbol))
            update_user_cost = filter_by_stock_symbol.userEstimatedCost + \
                user_detail['estimatedCost']
            update_user_shares = filter_by_stock_symbol.shares + \
                user_detail['estimatedShares']
            filter_by_stock_symbol.userEstimatedCost = update_user_cost
            filter_by_stock_symbol.shares = update_user_shares
            db.session.commit()
            return 'true'
        else:
            """
            Transactions model param > user_holdings
            has to be the amount of $ the user currently has after
            each transaction is complete.
            Leaving as is, working on the client side first
            """
            user_stock = Stock(company_name=user_detail['company_name'], stock_cost=user_detail['stockCost'],
                               user_estimated_shares=user_detail['estimatedShares'], user_estimated_cost=user_detail['estimatedCost'], users_id=user_detail['id'])
            transaction = Transactions(company_name=user_detail['company_name'], user_estimated_cost=user_detail['estimatedCost'],
                                       user_holdings=user_detail['estimatedCost'], user_id=user_detail['id'])
            db.session.add(user_stock)
            db.session.add(transaction)
            db.session.commit()
        return jsonify("Success! Stock added to db", 200)
    else:
        return jsonify('Something went wrong on our end! Please try again later.', 500)


@app.route('/sell_stock', methods=["POST"])
def sell_stock():
    user_detail = request.get_json()
    filter_by_id = Users.query.filter_by(id=user_detail['id']).first()

    if filter_by_id:
        filter_by_stock = Stock.query.filter_by(
            stock_symbol=user_detail['stockSymbol']).first()
        print('line 140 filter_by_stock {}'.format(filter_by_stock))
        return "ok", 200
    else:
        return 'nope', 500


@app.route('/user_stock', methods=['POST'])
def user_stock():
    user_detail = request.get_json()
    user = Users.query.filter_by(id=user_detail['id']).first()
    stock = Stock.query.filter_by(users_id=user_detail['id']).all()
    print(user)
    print(user.stocks)
    print(stock)

    stock_list = []

    for data in stock:
        stock_obj = {
            "companyName": data.companyName,
            "symbol": data.stock_symbol,
            "cost": data.stock_cost,
            "userEstimatedShares": data.userEstimatedShares,
            "userEstimatedHolding": data.userEstimatedCost,
        }
        stock_list.append(stock_obj)

    return jsonify({"stock": stock_list})


@app.route('/signup', methods=["POST"])
def signup():
    user_details = request.get_json()
    filter_user_model_by_username = Users.query.filter_by(
        username=user_details['username']).first()
    hashed_password = bcrypt.generate_password_hash(
        user_details['password']).decode('utf-8')

    if filter_user_model_by_username is None:
        user = Users(first_name=user_details['first_name'], last_name=user_details['last_name'],
                     email=user_details['email'], username=user_details['username'], password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return jsonify("Success! You will be redirect to your account shortly!", user.id, 200)
    else:
        return jsonify("The username has already been used! Please choose another username!", 500)


@app.route('/login', methods=["POST"])
def login():
    user_details = request.get_json()

    user = Users.query.filter_by(username=user_details["username"]).first()

    if user and bcrypt.check_password_hash(user.password, user_details['password']):
        response = {
            "user_id": user.id,
            "success_msg": "You are logged in successfully! You will be redirect to your account shortly!"
        }
        return jsonify(response, 200)
    else:
        return jsonify("hmmm.. We don't recognize that username or password. Please try again!", 500)
