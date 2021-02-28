import os
import json
import base64
import requests
from datetime import datetime
from flask import jsonify, request, render_template, redirect, url_for
from models import User, Transactions
from server_files import app

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

@app.route("/multiple", methods=["GET"])
def multiple():
    tesla = "tsla"
    apple = "aaple"
    
    search_url = "{}/stable/stock/market/batch?symbols={},{},FB&types=quote&token={}".format(base_url,tesla,apple, api_key)
    
    req = requests.get(search_url)
    
    resp = req.json()
    
    # tesla = resp['Tsla']
    
    
    return jsonify(resp['TSLA'])

@app.route('/testing_tutorial', methods=['GET'])
def testing_tutorial():
    return render_template('form.html')

@app.route('/submit_form', methods=["POST"])
def submit_form():
    # user = User(request.form['email'], request.form['email'])
    print(request.data)
    # transactions = Transactions(250)
    # db.session.add(user)
    # db.session.add(transactions)
    # db.session.commit()
    # return redirect(url_for('testing_tutorial'))
    return jsonify({'msg':'ok'})
