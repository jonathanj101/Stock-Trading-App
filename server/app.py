import os
import pytest
from server_files import app
# from test_transactions import TestTransactions
# print(app)


# @pytest.fixture
# def client():
#     # app.config['TESTING'] = True
#     client = app.test_client()
#     print(client)
#     return client


if __name__ == '__main__':

    app.run(host='127.0.0.1', port=int(os.environ.get("PORT", 5000)))
