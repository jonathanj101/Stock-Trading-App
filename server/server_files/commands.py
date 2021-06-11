import click
from flask.cli import with_appcontext

from __init__ import db
from .models import Users, Stock, Transactions


@click.command(name="create_tables")
@with_appcontext
def create_tables():
    db.create_all()
