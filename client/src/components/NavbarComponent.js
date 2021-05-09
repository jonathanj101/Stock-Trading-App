import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import LogInModal from './LogInModal';
import LogOutModal from './LogOutModal';

const NavbarComponent = ({ handleLogIn, handleLogOut, userId, username }) => {
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    let history = useHistory();
    debugger;

    const isUserId = (userId) => {
        debugger;
        console.log(userId);
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        if (userId !== '') {
            if (localStorageUserId !== null) {
                setIsUserAuthenticated(true);
            } else {
                setIsUserAuthenticated(false);
            }
        }
    };

    // const

    useEffect(() => {
        debugger;
        isUserId(userId);
    });

    const handleShow = () => {
        setShowLogInModal(true);
    };
    const handleClose = (e) => {
        setShowLogInModal(e);
    };

    const handleLogOutFunc = () => {
        localStorage.clear();
        setIsUserAuthenticated(false);
        handleLogOut();
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
                    {username !== '' ? (
                        <Nav.Item className="nav-link mr-3">
                            Logged In as {username}
                        </Nav.Item>
                    ) : (
                        <Nav.Item></Nav.Item>
                    )}
                    <NavLink to="/" exact className="nav-link mr-3 ">
                        Home
                    </NavLink>
                    <NavLink
                        to={isUserAuthenticated ? '/my-stocks' : '/'}
                        exact
                        className={isUserAuthenticated ? 'nav-link mr-3' : ''}
                        onClick={() => {}}
                    >
                        {isUserAuthenticated ? 'My Stocks' : ''}
                    </NavLink>
                    <Nav.Item
                        className="nav-link"
                        onClick={(e) => {
                            const title = e.currentTarget.innerHTML;
                            if (title === 'Log In') {
                                handleShow();
                            } else {
                                setShowLogOutModal(true);
                                handleLogOutFunc();
                            }
                        }}
                    >
                        {isUserAuthenticated ? 'Log Out' : 'Log In'}
                    </Nav.Item>
                    {/* <NavLink
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
                    </NavLink> */}
                </Nav>
            </Navbar>
        </div>
    );
};
export default NavbarComponent;
