try:
    import unittest
    import requests
except Exception as e:
    print("Some Modules are missings {}".format(e))

# resp = []


class TestAPI(unittest.TestCase):
    base_url = 'http://localhost:5000/'
    err_msg = "status code not successful! Instead got"

    # def test_multiple_stocks(self):
    #     print(TestAPI.base_url)
    #     response = requests.get("{}/multiple_stocks".format(TestAPI.base_url))
    #     print(response)
    #     # print(response.status_code)
    #     self.assertEqual(response.status_code, 200, TestAPI.err_msg +
    #                      " " + str(response.status_code))

    # def test_add_stock(self):
    #     print(TestAPI.base_url)
    #     data = {
    #         "id": 1,
    #         "company_name": "unit-test",
    #         "stockCost": 0,
    #         "stockSymbol": 'unit-test',
    #         "estimatedShares": 0,
    #         "estimatedCost": 0,
    #         "userHoldings": 0
    #     }

    #     response = requests.post(
    #         "{}/add_stock".format(TestAPI.base_url), json=data)
    #     print(" unit test line 35 response{}".format(response))
    #     print("unit test line 36 response.status_code  {}".format(
    #         response.status_code))

    #     self.assertEqual(response.status_code, 200,
    #                      TestAPI.err_msg + " " + str(response.status_code))

    def test_sell_stock(self):
        data = {
            "id": 1,
            "companyName": "unit-testing",
            "stockSymbol": "tsla",
            "estimatedShares": 0,
            "userSellingAmount": 0,
        }
        response = requests.post(
            "{}/sell_stock".format(TestAPI.base_url), json=data)

        self.assertEqual(response.status_code, 200,
                         TestAPI.err_msg + " " + str(response.status_code))


if __name__ == '__main__':
    unittest.main()
