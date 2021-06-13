# Stock Trading App 

- This application allows users to invest in Stock Exchange with fake currency.
- This project client side was built entirely in ReactJS ![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- This project server side was built entirely in Flask/Python ![](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) ![](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
- This project uses [IEX Cloud](https://iexcloud.io) API 

[Want to Invest? Click here!](fantasy-stock-trading-app.herokuapp.com)
![](./client/src/assets/images/my-stock-preview.png)


## Instructions

## Start Stock Trading

1. You will need to register in order to start buy/sell stocks.
2. After registration, the app it's as simple as search for the symbol of the desired stock you want to invest in!
    e.g: TSLA for Tesla stock or APPLE for Apple stock

## In order for this repository to work properly, if ever clone or download, please follow these steps below

### React (client-side):

1. After cloning or downloading this repository to your local machine, follow the step below:
    - Navigate to `client` directory and type this `npm install` in your command prompt
    - After `npm` has finished downloading the necessary files for React to work properly, go ahead and follow the guide to set up the server!

### Flask (server-side)

1. Make sure you have Python installed on your local machine before following the guide below.

- Open your CMD (Command Prompt) or git bash (if downloaded already)
- Navigate to `server` and download the require packages listing below using Python Package Manager `pip`
    - [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html#via-pip) * Make sure to activate `virtualenv` first before following next steps
    - [python-dotenv](https://pypi.org/project/python-dotenv/)
    - [requests](https://requests.readthedocs.io/en/latest/user/install/#install)
    - [Flask](https://flask.palletsprojects.com/en/1.1.x/installation/#install-flask)

3. Inside `server` directory, create a file name `.env` **Don't forget the dot (.)**
4. Before getting to the next step:
    - Make sure to have a [Developer IEX Cloud Account](https://iexcloud.io/cloud-login#/register). If not already then create an account in order to generate your API Key necessary for this project to function correctly.
6. Navigate or open `.env` file and add _exactly_ what the screenshot below has

![](./client/src/assets/images/env-preview.png)

## Important changes to make before app runs correctly
1. Now, you will have to modify 4 files.
    - In `app.py` change `from server.server_files import app` to `from server_files import app`
    - In `routes.py` change 
        - `from server.server_files import app, db bcrypt` to `from server_files import app, db, bcrypt`
        - `from server.server_files.models import Users, Transactions, Stock` to `from server_files import Users, Transactions, Stock`
    - In `models.py` change `from server.server_files import db` to `from server_files import db`
    - In `__init__.py` change `from server.server_files import routes` to `from server_files import routes`
- The reason to make these changes above is to prevent `ImportError` like shown on the screenshot below

![](./client/src/assets/images/import-error.jpg)

## Setting up Database

1. Install PostgreSQL
2. Run **backup.sql** scripts in sql_backups directory

## Summary

My first Full Stack application ever built, really enjoyed every minute building this project. The challenges faced while making this project has reinforced my understading of ReactJs Hooks, HTTP requests & Promises, as well as creating a PostgreSQL Database. Thus, using an Object-Relational-Mapper (ORM) like [Flask_SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) to facilitate the process of creating/updating/deleting data in the database. In addition, using my local machine CMD (Command Prompt) to exposed myself more to [PostgreSQL](https://www.postgresql.org/docs/) syntax or SQL Statements. Moreover, the [IEX Cloud](https://iexcloud.io/docs/api/) API has a [credit limit](https://intercom.help/iexcloud/en/articles/4856909-what-are-credits-and-premium-data-credits) or data access per API call. This lead me to refactored my ReactJs Hook (useEffect()) to minimize the HTTP Requests and preventing multiple calls to IEX Cloud endpoints at once, reducing the amounts of credit usage as much as posible. At last, the deployment process of this project has increase my knowledge of serving up client-side (ReactJs) to the server i currently use for this application which is Flask.


# Author

**Jonathan Jimenez** - Full Stack Developer - [LinkedIn](https://www.linkedin.com/in/jonathan-jimenez101/) | [Website](https://jonathan-jimenez.herokuapp.com/)


