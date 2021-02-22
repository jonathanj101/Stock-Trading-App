from database import db
import os

print(os.listdir())

class Testing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    rating = db.Column(db.Integer)
    
    
    
    slams = Table('slams', meta,
        Column('name', String, primary_key=True),
        Column('country', String)
    )

    results = Table('results', meta,
        Column('slam', String, ForeignKey('slams.name')),
        Column('year', Integer),
        Column('result', String)
    )

# Create the above tables
    meta.create_all(con)