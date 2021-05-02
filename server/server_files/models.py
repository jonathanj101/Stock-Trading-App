from flask import Blueprint
from server_files import db, login_manager
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

main = Blueprint('main', __name__)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    transactions = db.relationship('Transactions', backref="transactions")
    stocks = db.relationship("Stock", backref="users")

    def __repr__(self):
        return f"User ('{self.first_name}','{self.last_name}','{self.email}', '{self.username}', '{self.password}')"


class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    companyName = db.Column(db.String(255), nullable=False)
    stock_symbol = db.Column(db.String(255), nullable=False)
    stock_cost = db.Column(db.Float(precision='32'), nullable=False)
    userEstimatedshares = db.Column(db.Float(precision='32'), nullable=False)
    userEstimatedCost = db.Column(db.Float(precision='32'), nullable=False)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f"Stock (' {self.companyName}, {self.stock_symbol}', '{self.userEstimatedShares}', {self.stock_cost} , {self.userEstimatedCost} , '{self.date}')"


class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stock_symbol = db.Column(db.String(255), nullable=False)
    userEstimatedCost = db.Column(db.Float(precision='32'), nullable=False)
    user_holdings = db.Column(db.Float(precision='32'), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"Transactions (' {self.userEstimatedCost}, {self.stock_symbol} ,{self.user_holdings}','{self.date}, {self.user_id}')"
