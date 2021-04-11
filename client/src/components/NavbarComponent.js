import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LogInModal from '../components/LogInModal';

const NavbarComponent = ({ isLogged, onSubmit }) => {
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
                onSubmit={onSubmit}
            />
            <Navbar
                className="d-flex justify-content-between"
                bg="dark"
                variant="dark"
            >
                <Navbar.Brand>
                    {/* <img
                        alt="twitter bird"
                        width="125"
                        height="100"
                        className="d-inline-block align-top"
                    /> */}
                </Navbar.Brand>
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
                        // style={logInLink}
                    >
                        {isLogged ? 'Log Out' : 'Log In'}
                    </NavLink>
                </Nav>
            </Navbar>
        </div>
    );
};
export default NavbarComponent;
