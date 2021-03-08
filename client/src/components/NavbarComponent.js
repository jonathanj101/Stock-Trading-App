import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavbarComponent = ({
    modalClicked,
    isLogged,
    handleChange,
    onSubmit,
}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div style={{ fontSize: '1.5rem' }}>
            <Modal show={show} onHide={handleClose} centered>
                <div>
                    <div className="">
                        <Modal.Header closeButton>
                            <Modal.Title style={styles.modalHeaderTitle}>
                                Log In
                            </Modal.Title>
                        </Modal.Header>
                        <div>
                            <Form style={styles.formStyles}>
                                <Form.Group
                                    style={styles.formGroupStyles}
                                    controlId="logInEmail"
                                >
                                    <Form.Control
                                        onChange={handleChange}
                                        name="email"
                                        type="email"
                                        placeholder="Enter email"
                                    />
                                </Form.Group>
                                <Form.Group controlId="logInPassWord">
                                    <Form.Control
                                        style={styles.formGroupStyles}
                                        onChange={handleChange}
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                <Button
                                    className="mb-auto"
                                    variant="primary"
                                    onClick={() => {
                                        handleClose();
                                        onSubmit();
                                    }}
                                    size="lg"
                                    block
                                >
                                    Log In
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
                <span className="mx-auto">or</span>
                <Button href="/register">Register</Button>
            </Modal>
            {isLogged ? (
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
                            to="/my-stocks"
                            exact
                            className="nav-link mr-3 "
                        >
                            My Stocks
                        </NavLink>
                        <NavLink to="/" exact className="nav-link ">
                            Log Out
                        </NavLink>
                    </Nav>
                </Navbar>
            ) : (
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
                        <NavLink
                            onClick={handleShow}
                            className="nav-link mr-3 "
                            to={{ pathname: '' }}
                            activeStyle={{
                                color: 'white',
                                backgroundColor: '#007bff',
                            }}
                        >
                            <i
                                className="fas fa-user-tie mr-3"
                                style={{ fontSize: '2rem' }}
                            ></i>
                            Log In
                        </NavLink>
                        <NavLink to="/" exact className="nav-link mr-3 ">
                            Home
                        </NavLink>
                    </Nav>
                </Navbar>
            )}
        </div>
    );
};

var styles = {
    formStyles: {
        marginTop: '90px',
    },
    formGroupStyles: {
        margin: '50px auto 100px auto',
    },
    // modalDiv: {
    //     display: 'flex',
    //     width: '100%',
    //     height: '75%',
    //     justifyContent: 'space-between',
    // },
    modalHeaderTitle: {
        fontSize: '2rem',
        color: 'black',
    },
};

export default NavbarComponent;
