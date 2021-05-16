import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import LogInModal from './LogInModal';
import LogOutModal from './LogOutModal';
import AccountDropDown from './AccountDropDown';

const NavbarComponent = ({
    handleLogIn,
    handleLogOut: handleLogOutOnMain,
    userId,
    username,
}) => {
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    let history = useHistory();

    const isUserId = async (userId) => {
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        if (userId !== '') {
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

    const handleShow = () => {
        setShowLogInModal(true);
    };
    const handleClose = (e) => {
        setShowLogInModal(e);
    };

    const handleLogOutOnNav = () => {
        localStorage.clear();
        setIsUserAuthenticated(false);
        handleLogOutOnMain();
        setTimeout(() => {
            history.push('/');
            setShowLogOutModal(false);
        }, 2000);
    };

    return (
        <div style={{ fontSize: '1.5rem' }}>
            <LogInModal
                handleClose={handleClose}
                show={showLogInModal}
                handleLogIn={handleLogIn}
            />

            <LogOutModal show={showLogOutModal} handleClose={handleClose} />
            <Navbar
                className="d-flex justify-content-between"
                bg="dark"
                variant="dark"
            >
                <Navbar.Brand></Navbar.Brand>
                <Nav variant="pills" className="">
                    <NavLink to="/" exact className="nav-link mr-3 ">
                        <div>
                            <i className="fas fa-house-user"></i>
                            Home
                        </div>
                    </NavLink>
                    <NavLink
                        to={isUserAuthenticated ? '/my-stocks' : '/'}
                        exact
                        className={isUserAuthenticated ? 'nav-link mr-3' : ''}
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
                    {!isUserAuthenticated ? (
                        <Nav.Item
                            className="nav-link"
                            onClick={() => {
                                debugger;
                                handleShow();
                            }}
                        >
                            <div>
                                <i className="fas fa-sign-in-alt"></i>
                                Log In
                            </div>
                        </Nav.Item>
                    ) : (
                        <Nav.Item className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-user"></i>
                            </div>
                            <AccountDropDown
                                username={username}
                                handleLogOutOnNav={handleLogOutOnNav}
                            />
                        </Nav.Item>
                    )}
                </Nav>
            </Navbar>
        </div>
    );
};
export default NavbarComponent;
