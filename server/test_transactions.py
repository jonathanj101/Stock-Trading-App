try:
    import pytest
    import requests
    from app import client
    # from server_files.routes import add_stoc
    # print("unittest line 5 {}".format(app))
except Exception as e:
    print("Some Modules are missings {}".format(e))


# # class TestTransactions(unittest.TestCase):
# @pytest.fixture
def test_transaction(client):
    print(client)
    landing = requests.get('http://localhost:5000/multiple_stocks')
    # landing = client.get('/multiple_stocks')
    # html = landing.data.decode()
    # print(landing)
    assert landing.status_code == 200

    # print("line 18 unit test {}".format(html))
#     client = app.test_client()
#         # tester = app.test_client(self)
#         # # print(tester.get("/multiple_stocks"))
#         # # tester = 'ok'
#         # # response = tester.get('/multiple_stocks')
#         # # print
#         # # status_code = response.status_code

#         # print("tester unit test line 18 {}".format(tester))
#         # # print("tester unit test line 19 {}".format(status_code))
#         # # # self.assertEqual(status_code, 400)
#         # # print("status code unit test line 15 {}".format(status_code))
#         # # self.exmp_1 = add_stock(5, 5)
#         # # result = add_stock(5, 5)
#         # # print("unit testing line 6 {}".format(add_stock))
#         # # print("unit testing line 7 {}".format(result))


if __name__ == '__main__':
    pytest.main()
