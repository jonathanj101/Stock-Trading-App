try:
    import unittest
    import requests
except Exception as e:
    print("Some Modules are missings {}".format(e))


class TestAPI(unittest.TestCase):
    BASE_URL = 'http://localhost:5000/'
    ERR_MSG = "status code not successful! Instead got"

    def test_add_stock(self):
        DATA = {
            "id": 1,
            "company_name": "unit-test",
            "stockCost": 0,
            "stockSymbol": 'unit-test',
            "estimatedShares": 0,
            "estimatedCost": 0,
            "userHoldings": 0
        }

        response = requests.post(
            "{}/add_stock".format(TestAPI.BASE_URL), json=DATA)
        self.assertEqual(response.status_code, 200,
                         TestAPI.ERR_MSG + " " + str(response.status_code))

    def test_sell_stock(self):
        DATA = {
            "id": 1,
            "companyName": "unit-testing",
            "stockSymbol": "TSLA",
            "estimatedShares": 0,
            "userSellingAmount": 0,
        }
        response = requests.post(
            "{}/sell_stock".format(TestAPI.BASE_URL), json=DATA)

        self.assertEqual(response.status_code, 200,
                         TestAPI.ERR_MSG + " " + str(response.status_code))


if __name__ == '__main__':
    unittest.main()
