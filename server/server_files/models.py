from server_files import db
from flask import Blueprint
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

main = Blueprint('main', __name__)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), primary_key=True, nullable=False)
    last_name = db.Column(db.String(80), primary_key=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), primary_key=True)
    
    def __init__(self,first_name, last_name, username,email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return '<User %r>' % self.username
    
class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def __init__(self, amount):
        self.amount = amount