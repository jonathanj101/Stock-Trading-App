import React, { useState } from 'react';
import { Dropdown, Button, NavLink } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { styles } from './AccountDropDownStyles';

const AccountDropDown = ({
    username,
    handleLogOutOnMain,
    setShowLogOutModal,
    setIsUserAuthenticated,
}) => {
    const [userHoldings, setUserHoldings] = useState('');
    let history = useHistory();

    const updateUserHoldings = async () => {
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

    const handleLogOut = () => {
        localStorage.clear();
        setIsUserAuthenticated(false);
        setShowLogOutModal(true);
        setTimeout(() => {
            history.push('/');
            setShowLogOutModal(false);
            handleLogOutOnMain();
        }, 2000);
    };

    return (
        <div id="account-navbar-dropdown">
            <Dropdown
                onToggle={(e) => {
                    let isOpen = e;
                    if (isOpen) {
                        updateUserHoldings();
                    }
                }}
            >
                <Dropdown.Toggle className="fas fa-user" as={NavLink}>
                    {username}
                </Dropdown.Toggle>
                <Dropdown.Menu
                    id="username-dropdown"
                    style={styles.dropdownMenu}
                >
                    <div
                        id="username-dropdown-items"
                        className="d-flex flex-wrap flex-column mt-5 mb-5 "
                    >
                        <span>${userHoldings}</span>
                        <span>Buying power</span>
                    </div>
                    <Dropdown.Divider />
                    <Button
                        id="log-out-btn"
                        style={styles.button}
                        onClick={() => handleLogOut()}
                    >
                        Log Out
                    </Button>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default AccountDropDown;
