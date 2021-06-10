from flask import Blueprint
# from server_files import db
from server.server_files import db
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    user_holdings = db.Column(db.Float(precision='32'), nullable=False)
    transactions = db.relationship('Transactions', backref="transactions")
    stocks = db.relationship("Stock", backref="users")

    def __repr__(self):
        return f"User ('{self.first_name}','{self.last_name}','{self.email}', '{self.username}', '{self.password}')"


class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(255), nullable=False)
    stock_symbol = db.Column(db.String(255), nullable=False)
    stock_cost = db.Column(db.Float(precision='32'), nullable=False)
    user_estimated_shares = db.Column(db.Float(precision='32'), nullable=False)
    user_estimated_cost = db.Column(db.Float(precision='32'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Stock (' {self.company_name}, {self.stock_symbol}', '{self.user_estimated_shares}', {self.stock_cost} , {self.user_estimated_cost} , '{self.user_id}. {self.date}')"


class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(255), nullable=False)
    user_estimated_cost = db.Column(db.Float(precision='32'), nullable=False)
    user_holdings = db.Column(db.Float(precision='32'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Transactions (' {self.company_name} , {self.user_estimated_cost} , {self.user_holdings}' , '{self.user_id} , {self.date}')"
