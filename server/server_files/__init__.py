from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder='../../client/build/', static_url_path='/')

ENV = "!dev"

if ENV == "dev":
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1209lmc@localhost/fantasy_stock_app'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://guivrcrdrqyahs:fb907c88247bc5dcd0a25bb8441eecd9910496ed5d31887af3419cf68656db5c@ec2-34-195-143-54.compute-1.amazonaws.com:5432/d6qvodk01f8idf'

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
from server_files import routes
