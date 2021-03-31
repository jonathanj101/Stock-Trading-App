from flask import Blueprint
from server_files import db
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

main = Blueprint('main', __name__)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), primary_key=True, nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    stocks = db.relationship('Stock_purchased', backref='username', lazy=True)

    def __init__(self, first_name, last_name, username, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = password

    def __repr__(self):
        return f"User ({self.first_name},{self.last_name},{self.email})"


class Stock_purchased(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    stock = db.Column(db.String(255), nullable=False)
    shares = db.Column(db.String(255), nullable=False, primary_key=True)
    user_id = db.Column(db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='stock', lazy=True)

    def __repr__(self):
        return f"Stock ('{self.stock}', '{self.shares}', '{self.date}')"


class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, amount):
        self.amount = amount

    def __repr__(self):
        return f"Transactions ('{self.amount}','{self.data}')"
