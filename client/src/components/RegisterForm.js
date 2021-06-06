import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AlertMsgComponent from './AlertMsgComponent';

const FormComponent = ({ handleRegister }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [showAlertMsgComponent, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [validated, setValidated] = useState(false);

    let history = useHistory();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            handleRegistrantData(
                firstName,
                lastName,
                password,
                username,
                email,
            );
        }
    };

    const clearForm = () => {
        setFirstName('');
        setLastName('');
        setPassword('');
        setUsername('');
        setEmail('');
    };

    const redirectToAccountPage = (userId, username) => {
        setTimeout(() => {
            handleRegister(userId, username);
            history.push('/my-stocks');
            clearForm();
        }, 3000);
    };

    const handleRegistrantData = async (
        firstName,
        lastName,
        password,
        username,
        email,
    ) => {
        try {
            const response = await axios.post('/signup', {
                first_name: firstName,
                last_name: lastName,
                password: password,
                username: username,
                email: email,
                userHoldings: 100000,
            });
            setShow(true);
            const message = response.data[0];
            const statusCode = response.data[1];
            const responseUserId = response.data[2];
            const responseUsername = response.data[3];

            if (statusCode >= 500) {
                setErrorMessage(message);
            } else {
                localStorage.setItem('userId', JSON.stringify(responseUserId));
                setSuccessMessage(message);
                redirectToAccountPage(responseUserId, responseUsername);
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
                errorMessage={errorMessage}
                successMessage={successMessage}
            />
            <div style={styles.div}>
                <Form
                    id="registration-form"
                    noValidate
                    validated={validated}
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                    method="POST"
                    style={styles.formContainer}
                >
                    <div
                        id="registration-form-title-container"
                        style={styles.registrationFormTitleContainer}
                    >
                        <span
                            id="registration-form-title"
                            style={styles.registrationFormTitle}
                        >
                            Create an account
                        </span>
                    </div>
                    <Form.Row id="form-row" style={styles.formRow}>
                        <Form.Group
                            controlId="firstName"
                            style={styles.formGroup}
                        >
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                onChange={(e) => setFirstName(e.target.value)}
                                name="firstName"
                                value={firstName}
                                style={styles.formControl}
                            />
                            <Form.Control.Feedback
                                style={styles.formCheckStyles}
                            >
                                Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback
                                type="invalid"
                                style={styles.formCheckStyles}
                            >
                                Please type in your First Name!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            controlId="lastName"
                            style={styles.formGroup}
                        >
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                onChange={(e) => setLastName(e.target.value)}
                                name="lastName"
                                value={lastName}
                                style={styles.formControl}
                            />
                            <Form.Control.Feedback
                                style={styles.formCheckStyles}
                            >
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback
                                type="invalid"
                                style={styles.formCheckStyles}
                            >
                                Please type in your Last Name!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row id="form-row-email" style={styles.formRowEMail}>
                        <Form.Group
                            className="email"
                            controlId="email"
                            style={styles.formGroupEMail}
                            as={Col}
                            sm="12"
                            md="12"
                        >
                            <Form.Control
                                required
                                type="email"
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                value={email}
                                style={styles.formControl}
                            />
                            <Form.Control.Feedback
                                style={styles.formCheckStyles}
                            >
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback
                                type="invalid"
                                style={styles.formCheckStyles}
                            >
                                Please enter a valid E-mail!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row id="form-row" style={styles.formRow}>
                        <Form.Group
                            controlId="username"
                            style={styles.formGroup}
                        >
                            <Form.Control
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                required
                                style={styles.formControl}
                            />
                            <Form.Control.Feedback
                                style={styles.formCheckStyles}
                            >
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback
                                type="invalid"
                                style={styles.formCheckStyles}
                            >
                                Please choose a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            controlId="password"
                            style={styles.formGroup}
                        >
                            <Form.Control
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                value={password}
                                type="password"
                                placeholder="Password"
                                style={styles.formControl}
                                required
                            />
                            <Form.Control.Feedback
                                style={styles.formCheckStyles}
                            >
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback
                                type="invalid"
                                style={styles.formCheckStyles}
                            >
                                Please choose a Password!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <div style={styles.submitBtnContainer}>
                        <Button
                            id="submit-registration"
                            type="submit"
                            style={styles.submitBtn}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

var styles = {
    mainDiv: {
        width: '100%',
        height: '100%',
        margin: 'auto',
    },
    formContainer: {
        width: '50%',
        height: '100%',
        margin: '100px auto 100px auto',
        boxShadow: '6px 32px 144px rgb(179, 178, 178)',
    },
    registrationFormTitleContainer: {
        textAlign: 'center',
        marginBottom: '50px',
    },
    registrationFormTitle: {
        fontSize: '1.75rem',
    },
    formRow: {
        justifyContent: 'space-around',
    },
    formRowEMail: {
        width: '85%',
        margin: 'auto',
    },
    formGroupEMail: {
        width: '100%',
        marginTop: '50px',
        marginBottom: '50px',
        borderRadius: '2%',
    },
    formGroup: {
        width: '35%',
        marginTop: '50px',
        marginBottom: '50px',
        borderRadius: '2%',
    },
    formControl: {
        fontSize: '1.25rem',
    },
    formCheckStyles: {
        fontSize: '1rem',
    },
    submitBtnContainer: {
        margin: 'auto',
        width: '50%',
    },
    submitBtn: {
        borderRadius: '2%',
        marginTop: '50px',
        marginBottom: '50px',
        width: '100%',
        fontSize: '1.25rem',
    },
};
export default FormComponent;
