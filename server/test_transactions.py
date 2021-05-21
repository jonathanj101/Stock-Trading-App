try:
    import unittest
    import requests
except Exception as e:
    print("Some Modules are missings {}".format(e))

# resp = []


class TestAPI(unittest.TestCase):
    base_url = 'http://localhost:5000/'

    def test_multiple_stocks(self):
        print(TestAPI.base_url)
        response = requests.get("{}/multiple_stocks".format(TestAPI.base_url))
        print(response)
        # print(response.status_code)
        "ok"


if __name__ == '__main__':
    unittest.main()
    # print(resp)
    # pytest.main()
