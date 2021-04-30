import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LogInModal from './LogInModal';
import LogOutModal from './LogOutModal';

const NavbarComponent = ({ handleLogIn }) => {
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    useEffect(() => {
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        if (localStorageUserId !== null) {
            setIsUserAuthenticated(true);
        } else {
            setIsUserAuthenticated(false);
        }
    }, []);

    const handleShow = () => {
        setShowLogInModal(true);
    };
    const handleClose = (e) => {
        setShowLogInModal(e);
    };

    const handleLogOut = () => {
        setTimeout(() => {
            setShowLogOutModal(false);
        }, 2000);
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        if (localStorageUserId !== null) {
            localStorage.clear();
            setIsUserAuthenticated(false);
        }
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
                        Home
                    </NavLink>
                    <NavLink
                        to={isUserAuthenticated ? '/my-stocks' : '/'}
                        exact
                        className={isUserAuthenticated ? 'nav-link mr-3' : ''}
                    >
                        {isUserAuthenticated ? 'My Stocks' : ''}
                    </NavLink>
                    <NavLink
                        onClick={(e) => {
                            const title = e.currentTarget.innerHTML;
                            if (title === 'Log In') {
                                handleShow();
                            } else {
                                setShowLogOutModal(true);
                                handleLogOut();
                            }
                        }}
                        to="/"
                        exact
                        className="logIn"
                    >
                        {isUserAuthenticated ? 'Log Out' : 'Log In'}
                    </NavLink>
                </Nav>
            </Navbar>
        </div>
    );
};
export default NavbarComponent;
