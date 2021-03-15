import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const FormComponent = ({ handleRegister, mainState }) => {
    console.log(mainState);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            console.log(validated);
        }
        setValidated(true);
    };

    const onSubmit = (e) => {
        if (validated === false) {
            e.preventDefault();
            console.log('true');
        } else {
            handleRegister(firstName, lastName, password, username);
            e.preventDefault();
            console.log('false');
        }
    };

    return (
        <div style={styles.mainDiv}>
            <div style={styles.div}>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={(e) => {
                        handleSubmit(e);
                        onSubmit(e);
                    }}
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
                                onChange={(e) => setFirstName(e.target.value)}
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
                                onChange={(e) => setLastName(e.target.value)}
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
                            md="6"
                            controlId="username"
                            style={styles.formGroupStyles}
                        >
                            <Form.Control
                                onChange={(e) => setUsername(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
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
