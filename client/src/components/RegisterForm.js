import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormComponent = ({ handleRegister }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(firstName, lastName, email, password);
        handleRegister(firstName, lastName, email, password);
    };

    return (
        <div style={styles.mainDiv}>
            <div style={styles.div}>
                <Form style={styles.formContainer} onSubmit={onSubmit}>
                    <div className="w-50 text-center mx-auto">
                        <h1>Register</h1>
                    </div>
                    <div className="d-flex ">
                        <Form.Group
                            style={styles.formGroupStyles}
                            className="w-50 mr-3"
                            controlId="firstName"
                        >
                            <Form.Control
                                style={styles.formControlStyles}
                                onChange={(e) => setFirstName(e.target.value)}
                                name="firstName"
                                value={firstName}
                                placeholder="First name"
                            />
                        </Form.Group>
                        <Form.Group
                            style={styles.formGroupStyles}
                            className="w-50"
                            controlId="lastName"
                        >
                            <Form.Control
                                style={styles.formControlStyles}
                                onChange={(e) => setLastName(e.target.value)}
                                name="lastName"
                                value={lastName}
                                placeholder="Last name"
                            />
                        </Form.Group>
                    </div>
                    <Form.Group
                        style={{
                            border: '1px solid black',
                            borderRadius: '5px',
                        }}
                        controlId="email"
                    >
                        <Form.Control
                            style={styles.formControlStyles}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            value={email}
                            type="email"
                            placeholder="Enter email"
                        />
                    </Form.Group>
                    <Form.Group
                        style={styles.formGroupStyles}
                        controlId="password"
                    >
                        <Form.Control
                            style={styles.formControlStyles}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            value={password}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Button
                        style={styles.btnStyles}
                        variant="primary"
                        type="submit"
                        block
                    >
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
        borderRadius: '50px',
        boxShadow: '5px 10px 18px 10px #888888',
    },
    formGroupStyles: {
        margin: '100px auto',
        border: '1px solid black',
        borderRadius: '5px',
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
