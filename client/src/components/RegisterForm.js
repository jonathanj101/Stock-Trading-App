import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Col } from 'react-bootstrap';
import AlertMsgComponent from './AlertMsgComponent';

const FormComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [validated, setValidated] = useState(false);
    const [showAlertMsgComponent, setShow] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            handleRegister(firstName, lastName, password, username, email);
            setValidated(false);
        }
    };

    const handleRegister = async (
        firstName,
        lastName,
        password,
        username,
        email,
    ) => {
        try {
            const sendRegistrantData = await axios.post(
                '/submit_registration',
                {
                    first_name: firstName,
                    last_name: lastName,
                    password: password,
                    username: username,
                    email: email,
                },
            );
            const respMsg = sendRegistrantData.data[0];
            const respStatusCode = sendRegistrantData.data[1];
            if (respStatusCode >= 500) {
                setErrMsg(respMsg);
                setShow(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <AlertMsgComponent
                setShow={setShow}
                show={showAlertMsgComponent}
                errMsg={errMsg}
            />
            <div style={styles.mainDiv}>
                <div style={styles.div}>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                        method="POST"
                        style={styles.formContainer}
                    >
                        <h1 className="text-center">Register</h1>
                        <Form.Row
                            style={{
                                marginTop: '50px',
                            }}
                        >
                            <Form.Group
                                as={Col}
                                sm="12"
                                md="6"
                                controlId="firstName"
                                style={styles.formGroupStyles}
                            >
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    name="firstName"
                                    value={firstName}
                                    style={styles.formControlStyles}
                                />
                                <Form.Control.Feedback>
                                    Looks good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please type in your First Name!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                sm="12"
                                md="6"
                                controlId="lastName"
                                style={styles.formGroupStyles}
                            >
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    name="lastName"
                                    value={lastName}
                                    style={styles.formControlStyles}
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please type in your Last Name!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group
                                as={Col}
                                sm="12"
                                md="12"
                                controlId="email"
                                style={styles.formGroupStyles}
                            >
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="E-mail"
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    value={email}
                                    style={styles.formControlStyles}
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid E-mail!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group
                                as={Col}
                                sm="12"
                                md="6"
                                controlId="username"
                                style={styles.formGroupStyles}
                            >
                                <Form.Control
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={username}
                                    required
                                    style={styles.formControlStyles}
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                sm="12"
                                md="6"
                                controlId="password"
                                style={styles.formGroupStyles}
                            >
                                <Form.Control
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    name="password"
                                    value={password}
                                    type="password"
                                    placeholder="Password"
                                    style={styles.formControlStyles}
                                    required
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Password.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit" block style={styles.btnStyles}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

var styles = {
    mainDiv: {
        width: '50%',
        margin: '10% auto',
    },
    formContainer: {
        width: '100%',
        margin: 'auto',
        border: '1px solid black',
        boxShadow: '5px 10px 18px 10px #888888',
    },
    formGroupStyles: {
        marginTop: '50px',
    },
    formControlStyles: {
        fontSize: '2rem',
    },
    formCheckStyles: {
        fontSize: '2rem',
    },
    btnStyles: {
        width: '50%',
        fontSize: '2rem',
        margin: '100px auto 0 auto',
    },
    div: {
        width: '100%',
        height: '100%',
    },
};

export default FormComponent;
