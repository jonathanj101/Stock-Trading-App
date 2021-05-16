import unittest
from server_files.routes import add_stock


class TestTransactions(unittest.TestCase):
    print("unit testing line 6 {}".format(add_stock))


if __name__ == '__main__':
    print('line unittest 13 {}'.format(__name__))
    unittest.main()
