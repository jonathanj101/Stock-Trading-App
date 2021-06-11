import click
from flask.cli import with_appcontext

from server.server_files.__init__ import db
from server.server_files.models import Users, Stock, Transactions


@click.command(name="create_tables")
@with_appcontext
def create_tables():
    db.create_all()
