import os
from server_files import app
from tests.test_transactions import TestTransactions

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=int(os.environ.get("PORT", 5000)))
