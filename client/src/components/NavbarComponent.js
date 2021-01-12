import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavbarComponent = () => {
    return (
        <div>
            <Navbar
                className="d-flex justify-content-between"
                bg="dark"
                variant="dark">
                <Navbar.Brand>
                    {/* <img
                        alt="twitter bird"
                        width="125"
                        height="100"
                        className="d-inline-block align-top"
                    /> */}
                </Navbar.Brand>
                <Nav
                    variant='pills'
                    className=""
                >
                    <NavLink
                        to="/"
                        exact
                        className="nav-link mr-3 "
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/market"
                        exact
                        className="nav-link mr-3"
                    >
                        Market
                    </NavLink>
                    <NavLink
                        to="/my-stocks"
                        exact
                        className="nav-link "
                    >
                        My Stocks
                    </NavLink>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavbarComponent
