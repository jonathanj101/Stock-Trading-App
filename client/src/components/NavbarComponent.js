import React, { useState } from 'react';
import AlertMsgComponent from '../components/AlertMsgComponent';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const NavbarComponent = ({ modalClicked, isLogged, onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        debugger;

        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidate(true);
        } else {
            onSubmit(e);
            clearForm();
        }
    };

    const clearForm = () => {
        setUsername('');
        setPassword('');
    };

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
                            <Form
                                style={styles.formStyles}
                                noValidate
                                validated={validate}
                                onSubmit={(e) => {
                                    handleSubmit(e);
                                }}
                            >
                                <AlertMsgComponent />
                                <Form.Group
                                    style={styles.formGroupStyles}
                                    controlId="email"
                                >
                                    <Form.Control
                                        required
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        name="Username"
                                        type="text"
                                        value={username}
                                        placeholder="Enter Username"
                                    />
                                    <Form.Control.Feedback>
                                        Looks good!
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please type in your username!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Control
                                        required
                                        // style={styles.formGroupStyles}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        name="password"
                                        value={password}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <Form.Control.Feedback>
                                        Looks good!
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please type in your password!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button
                                    type="submit"
                                    className="mb-auto"
                                    variant="primary"
                                    size="lg"
                                    block
                                    style={{ marginTop: '100px' }}
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

var styles = {
    formStyles: {
        marginTop: '90px',
    },
    formGroupStyles: {
        margin: '50px auto 100px auto',
    },
    modalHeaderTitle: {
        fontSize: '2rem',
        color: 'black',
    },
};

export default NavbarComponent;
