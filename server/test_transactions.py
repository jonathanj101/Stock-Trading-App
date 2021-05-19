try:
    import pytest
    import requests
    from server_files import client
    # from server_files.routes import configure_app
    # from server_files.routes import add_stoc
    print("unittest line 5 {}".format(client))
except Exception as e:
    print("Some Modules are missings {}".format(e))


def test_transaction(client):
    landing = client.get('http://localhost:5000/multiple_stocks')
    response = landing.data

    assert response == 200


if __name__ == '__main__':
    pytest.main()
