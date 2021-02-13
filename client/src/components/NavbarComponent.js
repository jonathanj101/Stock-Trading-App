import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavbarComponent = ({ modalClicked }) => {
    const [inputValue, displayValue] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleValue(e) {
        const { value } = e.target;
        displayValue(value);
        console.log(`inputValue > ${[inputValue]}`);
        console.log(value);
    }

    return (
        <div style={{ fontSize: '1.5rem' }}>
            <Modal show={show} onHide={handleClose} centered>
                <div style={styles.modalDiv}>
                    <div className="w-50 bg-secondary">
                        <Modal.Header>
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
                                        onChange={handleValue}
                                        type="email"
                                        placeholder="Enter email"
                                    />
                                </Form.Group>
                                <Form.Group controlId="logInPassWord">
                                    <Form.Control
                                        style={styles.formGroupStyles}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-0 d-flex justify-content-end">
                                    <Button
                                        className="mb-auto"
                                        variant="primary"
                                        onClick={handleClose}
                                        size="lg"
                                    >
                                        Log In
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <div className="w-50 bg-info">
                        <Modal.Header closeButton>
                            <Modal.Title style={styles.modalHeaderTitle}>
                                Register
                            </Modal.Title>
                        </Modal.Header>
                        <Form style={styles.formStyles}>
                            <Form.Group className="d-flex mb-5">
                                <Form.Control placeholder="First Name" />
                                <Form.Control placeholder="Last Name" />
                            </Form.Group>
                            <Form.Group className="d-flex mb-0">
                                <Form.Control
                                    id="registrantEmail"
                                    style={styles.formGroupStyles}
                                    type="email"
                                    placeholder="Enter email"
                                />
                                <Form.Control
                                    id="registrantPassword"
                                    className=""
                                    style={styles.formGroupStyles}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <Form.Group className="mb-0 d-flex justify-content-end ">
                                <Button
                                    className=""
                                    variant="primary"
                                    onClick={handleClose}
                                    size="lg"
                                >
                                    Register
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </Modal>

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
                        activeStyle={{
                            fontWeight: 'bold',
                            color: 'blue',
                            backgroundColor: '#007bff',
                        }}
                        to={{ pathname: '' }}
                        exact
                    >
                        Log In / Register
                    </NavLink>
                    <NavLink to="/" exact className="nav-link mr-3 ">
                        Home
                    </NavLink>
                    <NavLink to="/summary" exact className="nav-link mr-3">
                        Market
                    </NavLink>
                    <NavLink to="/my-stocks" exact className="nav-link ">
                        My Stocks
                    </NavLink>
                </Nav>
            </Navbar>
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
    modalDiv: {
        display: 'flex',
        width: '100%',
        height: '75%',
        justifyContent: 'space-between',
    },
    modalHeaderTitle: {
        fontSize: '2rem',
        color: 'white',
    },
};

export default NavbarComponent;
