from app import db
from flask import Blueprint
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

main = Blueprint('main', __name__)

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
