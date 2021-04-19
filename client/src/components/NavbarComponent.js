import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LogInModal from './LogInModal';
import LogOutModal from './LogOutModal';

const NavbarComponent = ({ handleLogIn }) => {
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const [userId, setUserId] = useState('');
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [logInTitle, setLogInTitle] = useState('Log In');
    const [logOutTitle, setLogOutTitle] = useState('Log Out');

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
        const localStorageUserId = JSON.parse(localStorage.getItem('user'));
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
                setUserId={setUserId}
                setIsUserAuthenticated={setIsUserAuthenticated}
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
                            if (title === logInTitle) {
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
                        {isUserAuthenticated ? logOutTitle : logInTitle}
                    </NavLink>
                </Nav>
            </Navbar>
        </div>
    );
};
export default NavbarComponent;
