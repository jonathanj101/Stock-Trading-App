try:
    from server_files import client
    import pytest
    import requests
except Exception as e:
    print("Some Modules are missings {}".format(e))

resp = []


def test_transaction(client):
    landing = requests.get('http://localhost:5000/multiple_stocks')

    assert landing.status_code == 200

# def test_connection()


if __name__ == '__main__':
    print(resp)
    pytest.main()
