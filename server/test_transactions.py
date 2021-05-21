try:
    import unittest
    from server_files import app, bp
    # from server_files import bp
    from server_files.routes import multiple

    import pytest
    import requests
    # from unittest import mock
except Exception as e:
    print("Some Modules are missings {}".format(e))

# resp = []


class TestSample(unittest.TestCase):

    def test_transaction(self):
        # landing = client.get('http://localhost:5000/multiple_stocks/')
        # client.patch.object(server_files.routes, 'multiple', 200)
        # testing = bp.test_client()
        # self.testing = app.create_app(config='test')
        client = app.test_client()
        # print(self.testing)
        # print(bp.get('/multiple_stocks'))
        print(client.add_url_rule('/multiple_stocks').data)
        # resp = testing.get('http://localhost:5000/multiple_stocks/')
        # print(resp)
        # print(resp.status_code)
        # assert resp.status_code == 404

# def test_connection()


if __name__ == '__main__':
    unittest.main()
    # print(resp)
    # pytest.main()
