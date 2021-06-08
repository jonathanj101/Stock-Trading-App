from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# app = Flask(__name__)
app = Flask(__name__, static_folder='../../client/build/', static_url_path='/')

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1209lmc@localhost/fantasy_stock_app'
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
from server_files import routes
