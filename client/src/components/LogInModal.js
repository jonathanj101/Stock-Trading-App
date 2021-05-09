import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import AlertMsgComponent from './AlertMsgComponent';

const LogInModal = ({ show, handleClose, handleLogIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [showAlertMsgComponent, setShowAlertMsg] = useState(false);

    let history = useHistory();

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidate(true);
        } else {
            handleLogInRequest(username, password);
        }
    };

    const clearForm = () => {
        setUsername('');
        setPassword('');
        setErrMsg('');
        setSuccessMsg('');
        setShowAlertMsg(false);
    };

    const redirectToAccountPage = () => {
        debugger;
        setTimeout(() => {
            history.push('/my-stocks');
            handleClose(false);
            clearForm();
        }, 5000);
    };

    const handleLogInRequest = async (username, password) => {
        debugger;
        const respData = await axios.post('/login', {
            username: username,
            password: password,
        });
        const userId = respData.data[0].user_id;
        const respStatusCode = respData.data[1];
        const respDataUsername = respData.data[0].username;
        console.log(respData.data);
        setShowAlertMsg(true);
        if (respStatusCode >= 500) {
            const respErrMsg = respData.data[0];
            setErrMsg(respErrMsg);
        } else {
            const successMesg = respData.data[0].success_msg;
            setSuccessMsg(successMesg);
            redirectToAccountPage();
            localStorage.setItem('userId', JSON.stringify(userId));
            handleLogIn(userId, respDataUsername);
        }
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
                                <AlertMsgComponent
                                    errMsg={errMsg}
                                    successMsg={successMsg}
                                    show={showAlertMsgComponent}
                                />
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
