import os
import json
import base64
import requests
from datetime import datetime
from flask import jsonify, request, render_template, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from server_files import app, db, bcrypt
from server_files.models import Users, Transactions, Stock


API_KEY = os.environ.get('API_KEY')
BASE_URL = "https://cloud.iexapis.com"


@app.route("/", methods=["GET"])
def index():
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route("/multiple_stocks", methods=["GET"])
def multiple():
    stocks = ["tsla", "aapl", "fb", "qcom", "msft", "sne", "aal"]

    SEARCH_URL = "{}/stable/stock/market/batch?symbols={},{},{},{},{},{},{}&types=quote&token={}".format(
        BASE_URL, stocks[0], stocks[1], stocks[2], stocks[3], stocks[4], stocks[5], stocks[6], API_KEY)

    req = requests.get(SEARCH_URL)

    resp = req.json()

    def map_response(stock_symbol, resp):
        stock_quote = resp[stock_symbol.upper()]["quote"]
        return {
            "company_name": stock_quote["companyName"],
            "symbol": stock_quote["symbol"],
            "latestPrice": stock_quote["latestPrice"],
            "change": stock_quote["change"],
        }

    stocks_data = [map_response(stock, resp) for stock in stocks]
    return jsonify({"data": stocks_data})


@app.route("/search_stock/<string:stock>", methods=['GET'])
def search_stock(stock):
    try:
        SEARCH_URL = "{}/stable/stock/{}/quote?token={}".format(
            BASE_URL, stock, API_KEY)
        req = requests.get(SEARCH_URL)
        resp = req.json()
        stock_data = {
            "company_name": resp["companyName"],
            "cost": resp["latestPrice"],
            "change": resp["change"],
            "symbol": resp["symbol"]
        }
        return jsonify({"data": stock_data})
    except ValueError:
        return "stock symbol/s not found."


@app.route('/add_stock', methods=['POST'])
def add_stock():
    USER_DETAILS = request.get_json()
    USER = Users.query.filter_by(id=USER_DETAILS['id']).first()
    if USER:
        STOCK = Stock.query.filter_by(
            stock_symbol=USER_DETAILS["stockSymbol"], user_id=USER_DETAILS["id"]).first()
        if STOCK != None:

            update_user_cost = (STOCK.user_estimated_cost +
                                USER_DETAILS['estimatedCost'])
            update_user_shares = (STOCK.user_estimated_shares +
                                  USER_DETAILS['estimatedShares'])
            update_user_holdings = USER.user_holdings - update_user_cost
            filter_by_stock_symbol.user_estimated_cost = update_user_cost
            filter_by_stock_symbol.user_estimated_shares = update_user_shares
            USER.user_holdings = update_user_holdings
            transaction = Transactions(company_name=USER_DETAILS['company_name'], user_estimated_cost=USER_DETAILS['estimatedCost'],
                                       user_holdings=USER_DETAILS['estimatedCost'], user_id=USER_DETAILS['id'])
            db.session.add(transaction)
            db.session.commit()
            return jsonify("Success! Stock added!"), 200
        else:
            user_holdings = USER.user_holdings - USER_DETAILS['estimatedCost']
            USER.user_holdings = user_holdings
            user_stock = Stock(company_name=USER_DETAILS['company_name'],
                               stock_symbol=USER_DETAILS['stockSymbol'], stock_cost=USER_DETAILS['stockCost'],
                               user_estimated_shares=USER_DETAILS['estimatedShares'], user_estimated_cost=USER_DETAILS['estimatedCost'], user_id=USER_DETAILS['id'])
            transaction = Transactions(company_name=USER_DETAILS['company_name'], user_estimated_cost=USER_DETAILS[
                'estimatedCost'], user_holdings=user_holdings, user_id=USER_DETAILS['id'])
            db.session.add(user_stock)
            db.session.add(transaction)
            db.session.commit()
            return jsonify("Success! Stock updated!"), 200
    else:
        return jsonify('Something went wrong on our end! Please try again later.'), 500


@app.route('/sell_stock', methods=["POST"])
def sell_stock():
    USER_DETAILS = request.get_json()
    USER = Users.query.filter_by(id=USER_DETAILS['id']).first()

    STOCK = Stock.query.filter_by(
        stock_symbol=USER_DETAILS['stockSymbol'], user_id=USER_DETAILS["id"]).first()

    SEARCH_STOCK = "{}/stable/stock/{}/quote?token={}".format(
        BASE_URL, USER_DETAILS['stockSymbol'], API_KEY)

    req = requests.get(SEARCH_STOCK)

    resp = req.json()

    stock_bought_at = STOCK.stock_cost

    difference_in_cost = (resp['latestPrice'] -
                          stock_bought_at) * STOCK.user_estimated_shares

    difference_in_shares = (STOCK.user_estimated_cost -
                            USER_DETAILS['userSellingAmount']) / STOCK.stock_cost
    user_holdings = USER.user_holdings + \
        difference_in_cost + USER_DETAILS['userSellingAmount']

    MESSAGE = "Success!"

    if USER:
        STOCK.user_estimated_cost = STOCK.user_estimated_cost - \
            USER_DETAILS['userSellingAmount']
        STOCK.user_estimated_shares = difference_in_shares
        USER.user_holdings = user_holdings
        if STOCK.user_estimated_cost == 0:
            transaction = Transactions(company_name=USER_DETAILS['companyName'], user_estimated_cost=USER_DETAILS[
                'userSellingAmount'], user_holdings=user_holdings, user_id=USER_DETAILS['id'])
            stock = Stock.query.filter_by(
                stock_symbol=USER_DETAILS['stockSymbol']).delete()
            db.session.add(transaction)
            db.session.commit()
            return (MESSAGE, 200)
        else:
            transaction = Transactions(company_name=USER_DETAILS['companyName'], user_estimated_cost=USER_DETAILS[
                'userSellingAmount'], user_holdings=user_holdings, user_id=USER_DETAILS['id'])
            db.session.add(transaction)
            db.session.commit()

        return (MESSAGE, 200)
    else:
        return ('Looks like there is an error on our end!', 500)


@app.route('/user_stock', methods=['POST'])
def user_stock():
    USER_DETAILS = request.get_json()
    USER = Users.query.filter_by(id=USER_DETAILS['id']).first()
    STOCK = Stock.query.filter_by(user_id=USER_DETAILS['id']).all()
    stock_list = []

    if USER:
        for data in STOCK:
            search_url = "{}/stable/stock/{}/quote?token={}".format(
                BASE_URL, data.stock_symbol, API_KEY)
            req = requests.get(search_url)
            resp = req.json()
            difference_in_cost = (
                resp['latestPrice'] - data.stock_cost) * data.user_estimated_shares

            stock_obj = {
                "companyName": data.company_name,
                "symbol": data.stock_symbol,
                "cost": data.stock_cost,
                "userEstimatedShares": data.user_estimated_shares,
                "userEstimatedHolding": data.user_estimated_cost,
                "differenceInCost": difference_in_cost
            }

            stock_list.append(stock_obj)

        if stock_list != '':
            return jsonify({"stock": stock_list})
        else:
            return jsonify("An issue has occurred on our end! Please try again later", 500)

    else:
        return jsonify('User not found in our record! You will be redirected to the home page.', 500)


@app.route('/signup', methods=["POST"])
def signup():
    USER_DETAILS = request.get_json()
    USERNAME = Users.query.filter_by(
        username=USER_DETAILS['username']).first()
    hashed_password = bcrypt.generate_password_hash(
        USER_DETAILS['password']).decode('utf-8')

    if USERNAME is None:
        user = Users(first_name=USER_DETAILS['first_name'], last_name=USER_DETAILS['last_name'],
                     email=USER_DETAILS['email'], username=USER_DETAILS['username'], password=hashed_password, user_holdings=USER_DETAILS['userHoldings'])
        db.session.add(user)
        db.session.commit()
        MESSAGE = "Success! You will be redirect to your account shortly!"
        return jsonify(MESSAGE, 200, user.id, user.username)
    else:
        MESSAGE = "The username has already been used! Please choose another username!"
        return jsonify(MESSAGE, 500)


@app.route('/login', methods=["POST"])
def login():
    USER_DETAILS = request.get_json()

    USER = Users.query.filter_by(username=USER_DETAILS["username"]).first()
    if USER and bcrypt.check_password_hash(USER.password, USER_DETAILS['password']):
        MESSAGE = "You are logged in successfully! You will be redirected to your account shortly!"

        return jsonify(MESSAGE, 200, USER.id, USER.username)
    else:
        MESSAGE = "We don't recognize that username or password. Please try again!"
        return jsonify(MESSAGE, 500)


@app.route('/user', methods=["POST"])
def user():
    USER_DETAILS = request.get_json()

    USER = Users.query.filter_by(id=USER_DETAILS['id']).first()

    user_obj = {
        "username": USER.username,
        "user_holdings": USER.user_holdings
    }
    if USER:

        return jsonify(user_obj), 200
    else:
        return ("User not found!"), 500
