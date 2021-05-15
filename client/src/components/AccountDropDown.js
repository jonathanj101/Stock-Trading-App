import React, { useState, useEffect } from 'react';
import { NavDropdown, Button } from 'react-bootstrap';
import axios from 'axios';

const AccountDropDown = ({ username, handleLogOutOnNav }) => {
    const [userHoldings, setUserHoldings] = useState();

    const updateUserHoldings = () => {
        // debugger;
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        const fetchUserHoldings = async () => {
            const response = await axios.post('/user', {
                id: localStorageUserId,
            });
            return response;
        };
        fetchUserHoldings().then((data) => {
            setUserHoldings(data.data.user_holdings);
        });
    };
    return (
        <div id="account-navbar-dropdown">
            <NavDropdown
                title={username}
                id="basic-nav-dropdown"
                drop="down"
                onClick={() => {
                    console.log('clicked dropdown');
                    updateUserHoldings();
                }}
            >
                <NavDropdown.Item
                    // id="dropdown-item"
                    className="d-flex justify-content-center mt-5 mb-5"
                >
                    {/* <div className="d-flex flex-wrap flex-column">
                        <span>$ {userHoldings}</span>
                        <span>Portfolio Value</span>
                    </div> */}
                    <div className="d-flex flex-wrap flex-column">
                        <span>${userHoldings}</span>
                        <span>Buying power</span>
                    </div>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <Button
                    block
                    style={styles.button}
                    onClick={() => handleLogOutOnNav}
                >
                    Log Out
                </Button>
            </NavDropdown>
        </div>
    );
};

const styles = {
    button: {
        width: '50%',
        margin: '50px auto 5px',
        fontSize: '1.5rem',
    },
};

export default AccountDropDown;
