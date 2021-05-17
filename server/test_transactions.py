try:
    import pytest
    from server_files import client
    # from server_files.routes import add_stoc
    # print("unittest line 5 {}".format(app))
except Exception as e:
    print("Some Modules are missings {}".format(e))


# # class TestTransactions(unittest.TestCase):
# @pytest.fixture
def test_transaction(client):
    landing = client.get('/multiple_stocks')
    html = landing.data.decode()
    print(html.status_code)
#     app.testing = True
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
    # print(app)
    print('line unittest 13 {}'.format(__name__))
    pytest.main()
