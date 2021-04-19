import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LogInModal from '../components/LogInModal';

const NavbarComponent = ({ isLogged, handleLogIn }) => {
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState('');
    const [logInTitle, setLogInTitle] = useState('Log In');
    const [logOutTitle, setLogOutTitle] = useState('Log Out');

    const handleShow = () => {
        setShow(true);
    };
    const handleClose = (e) => {
        setShow(e);
    };

    const handleLogOut = () => {
        setTimeout(() => {
            alert("You've benn successfully logged out!");
        }, 2000);
        const localStorageUserId = JSON.parse(localStorage.getItem('user'));
        console.log(`localstorage > ${localStorageUserId}, user id ${userId}`);
    };

    return (
        <div style={{ fontSize: '1.5rem' }}>
            <LogInModal
                handleClose={handleClose}
                show={show}
                handleLogIn={handleLogIn}
                setUserId={setUserId}
            />
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
                        to={isLogged ? '/my-stocks' : '/'}
                        exact
                        className={isLogged ? 'nav-link mr-3' : ''}
                    >
                        {isLogged ? 'My Stocks' : ''}
                    </NavLink>
                    <NavLink
                        onClick={(e) => {
                            debugger;
                            const title = e.currentTarget.innerHTML;
                            if (title === logInTitle) {
                                handleShow();
                            } else {
                                handleLogOut();
                            }
                        }}
                        to="/"
                        exact
                        className="logIn"
                    >
                        {isLogged ? logOutTitle : logInTitle}
                    </NavLink>
                </Nav>
            </Navbar>
        </div>
    );
};
export default NavbarComponent;
