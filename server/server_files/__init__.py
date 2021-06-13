import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder='../../client/build/', static_url_path='/')

ENV = "!dev"
DATABASE_URI = os.environ.get("DATABASE_URI")
MY_POSTGRES_DB_URI = os.environ.get("MY_POSTGRES_DB_URI")


if ENV == "dev":
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = MY_POSTGRES_DB_URI
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
from server.server_files import routes
# from server_files import routes
# commentted out for heroku, gunicorn importing error => preventing to db.create_all()
