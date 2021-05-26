import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
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

    return (
        <div
            // className="col-12 p-0"
            style={{
                fontSize: '1.5rem',
                width: '100%',
            }}
        >
            <LogInModal
                handleClose={handleClose}
                show={showLogInModal}
                handleLogIn={handleLogIn}
            />

            <LogOutModal show={showLogOutModal} handleClose={handleClose} />
            <Navbar
                className="row"
                collapseOnSelect
                expand="sm"
                className="d-flex justify-content-end"
                bg="dark"
                variant="dark"
            >
                <Navbar.Brand></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse
                    // className="col col-md-12 col-lg-12"
                    className="justify-content-end"
                    id="responsive-navbar-nav"
                >
                    <Nav className="row" variant="pills">
                        <NavLink
                            className="collapse navbar-collapse"
                            to="/"
                            exact
                            className="nav-link mr-3 "
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
                        {!isUserAuthenticated ? (
                            <Nav.Item
                                className="nav-link"
                                onClick={() => {
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
                                <AccountDropDown
                                    username={username}
                                    handleLogOutOnMain={handleLogOutOnMain}
                                    setIsUserAuthenticated={
                                        setIsUserAuthenticated
                                    }
                                    setShowLogOutModal={setShowLogOutModal}
                                />
                            </Nav.Item>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
export default NavbarComponent;
