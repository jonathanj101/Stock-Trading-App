import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LogOutModal from './LogOutModal';
import AccountDropDown from './AccountDropDown';

const NavbarComponent = ({
    handleLogOut: handleLogOutOnMain,
    userId,
    username,
}) => {
    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    const isUserId = async (usersId) => {
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        if (usersId !== '') {
            if (localStorageUserId !== null) {
                setIsUserAuthenticated(true);
            } else {
                setIsUserAuthenticated(false);
            }
        }
    };

    useEffect(() => {
        isUserId(userId);
    });

    return (
        <div
            style={{
                fontSize: '1.5rem',
                width: '100%',
            }}
        >
            <LogOutModal show={showLogOutModal} />
            <Navbar
                collapseOnSelect
                expand="sm"
                className="d-flex justify-content-end"
                bg="dark"
                variant="dark"
            >
                <Navbar.Brand></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse
                    className="justify-content-end"
                    id="responsive-navbar-nav"
                >
                    <Nav variant="pills">
                        <NavLink
                            to="/"
                            exact
                            className="nav-link mr-3 collapse navbar-collapse "
                        >
                            <div>
                                <i className="fas fa-house-user"></i>
                                Home
                            </div>
                        </NavLink>
                        <NavLink
                            to={isUserAuthenticated ? '/my-stocks' : '/'}
                            exact
                            className={
                                isUserAuthenticated ? 'nav-link mr-3' : ''
                            }
                        >
                            {isUserAuthenticated ? (
                                <div>
                                    <i className="fas fa-business-time"></i>
                                    My Stocks
                                </div>
                            ) : (
                                ''
                            )}
                        </NavLink>
                        {isUserAuthenticated ? (
                            <Nav.Item className="d-flex align-items-center">
                                <AccountDropDown
                                    username={username}
                                    handleLogOutOnMain={handleLogOutOnMain}
                                    setIsUserAuthenticated={
                                        setIsUserAuthenticated
                                    }
                                    setShowLogOutModal={setShowLogOutModal}
                                />
                            </Nav.Item>
                        ) : (
                            <div></div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
export default NavbarComponent;
