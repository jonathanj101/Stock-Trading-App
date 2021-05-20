import os
import pytest
from server_files import app


# @pytest.fixture
# def client():
#     app.testing = True
#     # app.config['TESTING'] = True
#     client = app.test_client()
#     return cli


if __name__ == '__main__':
    # print(app.config)

    app.run(host='127.0.0.1', port=int(os.environ.get("PORT", 5000)))
