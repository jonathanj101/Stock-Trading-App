import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AlertMsgComponent from './AlertMsgComponent';

const LogInModal = ({ show, onSubmit, handleClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = (e) => {
        debugger;

        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidate(true);
        } else {
            onSubmit(e);
            handleLogInRequest(username, password);
            clearForm();
        }
    };

    const clearForm = () => {
        setUsername('');
        setPassword('');
    };

    const handleLogInRequest = async (username, password) => {
        // debugger;
        console.log('testing');
        // const respData = await axios.post('/login', {
        //     username:username,
        //     password:password
        // });
        // console.log(respData);
    };

    return (
        <div>
            <Modal show={show} onHide={() => handleClose(false)} centered>
                <div>
                    <div className="">
                        <Modal.Header closeButton>
                            <Modal.Title style={styles.modalHeaderTitle}>
                                Log In
                            </Modal.Title>
                        </Modal.Header>
                        <div>
                            <Form
                                noValidate
                                validated={validate}
                                onSubmit={(e) => {
                                    handleSubmit(e);
                                }}
                                method="POST"
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
        </div>
    );
};

var styles = {
    formGroupStyles: {
        margin: '50px auto 100px auto',
    },
    modalHeaderTitle: {
        fontSize: '2rem',
        color: 'black',
    },
};

export default LogInModal;
