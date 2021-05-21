import pytest
from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

bp = Blueprint('myapp', __name__)

app = Flask(__name__)
app.register_blueprint(bp)


# @pytest.fixture
# def client():
#     app.testing = True
#     # app.config['TESTING'] = True
#     # print(app.config)
#     client = app.test_client()
#     return client


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1209lmc@localhost/fantasy_stock_app'
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
db = SQLAlchemy(app)
from server_files import routes
