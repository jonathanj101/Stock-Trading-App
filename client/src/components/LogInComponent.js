import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import AlertMsgComponent from './AlertMsgComponent';

const LogInComponent = ({ handleLogIn }) => {
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
        setTimeout(() => {
            history.push('/my-stocks');
            clearForm();
        }, 5000);
    };

    const handleLogInRequest = async (username, password) => {
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
        <div className="w-100">
            <Form
                id="log-in-form"
                noValidate
                validated={validate}
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
                method="POST"
                style={styles.formStyle}
            >
                <AlertMsgComponent
                    errMsg={errMsg}
                    successMsg={successMsg}
                    show={showAlertMsgComponent}
                />
                <Form.Text style={styles.formTextStyles}>
                    Sign In to your account
                </Form.Text>
                <Form.Group style={styles.formGroupStyles} controlId="email">
                    <Form.Control
                        required
                        style={{ fontSize: '1.25rem' }}
                        onChange={(e) => setUsername(e.target.value)}
                        name="Username"
                        type="text"
                        value={username}
                        placeholder="Enter Username"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please type in your username!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control
                        style={{ fontSize: '1.25rem' }}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please type in your password!
                    </Form.Control.Feedback>
                </Form.Group>
                <Button
                    id="log-in-btn"
                    type="submit"
                    className="mb-auto"
                    style={{ marginTop: '50px' }}
                    variant="primary"
                    size="lg"
                    block
                >
                    Log In
                </Button>
                <div className="mt-5 d-flex ">
                    <p>Don't have an account?</p>
                    <Link className="ml-3" to="/register">
                        Register here
                    </Link>
                </div>
            </Form>
        </div>
    );
};

var styles = {
    formStyle: {
        padding: '100px',
        width: '75%',
        margin: 'auto',
    },
    formGroupStyles: {
        marginBottom: '50px',
    },
    formTextStyles: {
        fontSize: '1.75rem',
        margin: '50px auto',
        fontWeight: 'lighter',
    },
};

export default LogInComponent;
