import os
import json
import base64
import requests
import sqlalchemy
from datetime import datetime
from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
# from database import User, db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1209lmc@localhost/testing_tutorial'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    
    def __init__(self, username,email):
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username
    
class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def __init__(self, amount):
        self.amount = amount

print(sqlalchemy.__version__)


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
    print(request.form['username'])
    user = User(request.form['username'], request.form['email'])
    transactions = Transactions(250)
    db.session.add(user)
    db.session.add(transactions)
    db.session.commit()
    return redirect(url_for('testing_tutorial'))


if __name__ == '__main__':
    main.run(host='127.0.0.1', port=int(os.environ.get("PORT", 5000)))
