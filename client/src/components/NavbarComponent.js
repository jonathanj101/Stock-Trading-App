import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LogInModal from '../components/LogInModal';

const NavbarComponent = ({ isLogged, handleLogIn }) => {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    };
    const handleClose = (f) => {
        setShow(f);
    };

    return (
        <div style={{ fontSize: '1.5rem' }}>
            <LogInModal
                handleClose={handleClose}
                show={show}
                handleLogIn={handleLogIn}
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
                        onClick={handleShow}
                        to="/"
                        exact
                        className="logIn"
                    >
                        {isLogged ? 'Log Out' : 'Log In'}
                    </NavLink>
                </Nav>
            </Navbar>
        </div>
    );
};
export default NavbarComponent;
