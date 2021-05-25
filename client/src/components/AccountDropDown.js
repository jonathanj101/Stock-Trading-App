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
    const [userHoldings, setUserHoldings] = useState();
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
        handleLogOutOnMain();
        setTimeout(() => {
            history.push('/');
            setShowLogOutModal(false);
        }, 2000);
    };

    return (
        <div id="account-navbar-dropdown">
            <Dropdown
                className="d-flex"
                onToggle={(e) => {
                    let isOpen = e;
                    if (isOpen) {
                        updateUserHoldings();
                    }
                }}
            >
                <div className="mt-2">
                    <i className="fas fa-user"></i>
                </div>
                <Dropdown.Toggle as={NavLink}>{username}</Dropdown.Toggle>
                <Dropdown.Menu style={styles.dropdownMenu}>
                    <div className="d-flex flex-wrap flex-column mt-5 mb-5 ">
                        <span>${userHoldings}</span>
                        <span>Buying power</span>
                    </div>
                    <Dropdown.Divider />
                    <Button
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
