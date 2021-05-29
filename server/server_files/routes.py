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


@app.route("/search_stock/<string:stock>", methods=['GET'])
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
    user = Users.query.filter_by(id=user_detail['id']).first()
    if user:
        filter_by_stock_symbol = Stock.query.filter_by(
            stock_symbol=user_detail['stockSymbol']).first()
        if filter_by_stock_symbol != None:

            update_user_cost = (filter_by_stock_symbol.user_estimated_cost +
                                user_detail['estimatedCost'])
            update_user_shares = (filter_by_stock_symbol.user_estimated_shares +
                                  user_detail['estimatedShares'])
            update_user_holdings = user.user_holdings - update_user_cost
            filter_by_stock_symbol.user_estimated_cost = update_user_cost
            filter_by_stock_symbol.user_estimated_shares = update_user_shares
            user.user_holdings = update_user_holdings
            transaction = Transactions(company_name=user_detail['company_name'], user_estimated_cost=user_detail['estimatedCost'],
                                       user_holdings=user_detail['estimatedCost'], user_id=user_detail['id'])
            db.session.add(transaction)
            db.session.commit()
            return "Success! Stock added to db", 200
        else:
            user_holdings = user.user_holdings - user_detail['estimatedCost']
            user.user_holdings = user_holdings
            user_stock = Stock(company_name=user_detail['company_name'],
                               stock_symbol=user_detail['stockSymbol'], stock_cost=user_detail['stockCost'],
                               user_estimated_shares=user_detail['estimatedShares'], user_estimated_cost=user_detail['estimatedCost'], user_id=user_detail['id'])
            transaction = Transactions(company_name=user_detail['company_name'], user_estimated_cost=user_detail[
                                       'estimatedCost'], user_holdings=user_holdings, user_id=user_detail['id'])
            db.session.add(user_stock)
            db.session.add(transaction)
            db.session.commit()
            return jsonify("Success! Stock in db updated!", 200)
    else:
        return jsonify('Something went wrong on our end! Please try again later.', 500)


@app.route('/sell_stock', methods=["POST"])
def sell_stock():
    user_detail = request.get_json()
    user = Users.query.filter_by(id=user_detail['id']).first()

    filter_by_stock = Stock.query.filter_by(
        stock_symbol=user_detail['stockSymbol']).first()

    search_stock = "{}/stable/stock/{}/quote?token={}".format(
        base_url, user_detail['stockSymbol'], api_key)

    req = requests.get(search_stock)

    resp = req.json()

    stock_bought_at = filter_by_stock.stock_cost

    difference_in_cost = (resp['latestPrice'] -
                          stock_bought_at) * filter_by_stock.user_estimated_shares

    difference_in_shares = (filter_by_stock.user_estimated_cost -
                            user_detail['userSellingAmount']) / filter_by_stock.stock_cost
    user_holdings = user.user_holdings + \
        difference_in_cost + user_detail['userSellingAmount']

    if user:
        filter_by_stock.user_estimated_cost = filter_by_stock.user_estimated_cost - \
            user_detail['userSellingAmount']
        filter_by_stock.user_estimated_shares = difference_in_shares
        user.user_holdings = user_holdings
        if filter_by_stock.user_estimated_cost == 0:
            transaction = Transactions(company_name=user_detail['companyName'], user_estimated_cost=user_detail[
                'userSellingAmount'], user_holdings=user_holdings, user_id=user_detail['id'])
            stock = Stock.query.filter_by(
                stock_symbol=user_detail['stockSymbol']).delete()
            db.session.add(transaction)
            db.session.commit()
        else:
            transaction = Transactions(company_name=user_detail['companyName'], user_estimated_cost=user_detail[
                'userSellingAmount'], user_holdings=user_holdings, user_id=user_detail['id'])
            db.session.add(transaction)
            db.session.commit()

        return "Success!", 200
    else:
        return 'Looks like there is an error on our end!', 500


@app.route('/user_stock', methods=['POST'])
def user_stock():
    user_detail = request.get_json()
    user = Users.query.filter_by(id=user_detail['id']).first()
    stock = Stock.query.filter_by(user_id=user_detail['id']).all()
    stock_list = []

    if user:
        for data in stock:
            search_url = "{}/stable/stock/{}/quote?token={}".format(
                base_url, data.stock_symbol, api_key)
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
    user_details = request.get_json()
    filter_user_model_by_username = Users.query.filter_by(
        username=user_details['username']).first()
    hashed_password = bcrypt.generate_password_hash(
        user_details['password']).decode('utf-8')

    if filter_user_model_by_username is None:
        user = Users(first_name=user_details['first_name'], last_name=user_details['last_name'],
                     email=user_details['email'], username=user_details['username'], password=hashed_password, user_holdings=user_details['userHoldings'])
        db.session.add(user)
        db.session.commit()
        return jsonify("Success! You will be redirect to your account shortly!", 200, user.id)
    else:
        return jsonify("The username has already been used! Please choose another username!", 500)


@app.route('/login', methods=["POST"])
def login():
    user_details = request.get_json()

    user = Users.query.filter_by(username=user_details["username"]).first()

    if user and bcrypt.check_password_hash(user.password, user_details['password']):
        response = {
            "user_id": user.id,
            "success_msg": "You are logged in successfully! You will be redirected to your account shortly!",
            "username": user.username
        }
        return jsonify(response, 200)
    else:
        return jsonify("We don't recognize that username or password. Please try again!", 500)


@app.route('/user', methods=["POST"])
def user():
    user_detail = request.get_json()

    user = Users.query.filter_by(id=user_detail['id']).first()

    user_obj = {
        "username": user.username,
        "user_holdings": user.user_holdings
    }

    if user:
        return jsonify(user_obj)
    else:
        return "User not found!", 500
