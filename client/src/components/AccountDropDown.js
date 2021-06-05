import React, { useState } from 'react';
import { Dropdown, Button, NavLink } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
            console.log(data.data);
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

const styles = {
    button: {
        width: '50%',
        margin: '50px auto 5px',
        fontSize: '1.5rem',
    },
    dropdownMenu: {
        width: '25rem',
        textAlign: 'center',
        fontSize: '1.5rem',
    },
};

export default AccountDropDown;
