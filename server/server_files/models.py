from flask import Blueprint
from server_files import db
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

main = Blueprint('main', __name__)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    stocks = db.relationship("Stock", backref="users")

    def __repr__(self):
        return f"User ('{self.first_name}','{self.last_name}','{self.email}', '{self.username}', '{self.password}')"


class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    stock = db.Column(db.String(255), nullable=False)
    shares = db.Column(db.String(255), nullable=False)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f"Stock ('{self.stock}', '{self.shares}', '{self.date}')"


class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Transactions ('{self.amount}','{self.data}')"
