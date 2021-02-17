from database import db
import os

print(os.listdir())

class Testing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    rating = db.Column(db.Integer)