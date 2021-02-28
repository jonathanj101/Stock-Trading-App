import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Col } from 'react-bootstrap';

const FormComponent = ({ handleRegister }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
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
        if (validated === true) {
            e.preventDefault();
            console.log('true');
        } else {
            e.preventDefault();
            handleRegister(firstName, lastName, email, password);
            fetch('/submit_form', {
                method: 'post',
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    city: city,
                    state: state,
                    zipCode: zipCode,
                }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
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
                                Looks good!
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
                                type="text"
                                placeholder="Username"
                                required
                                style={styles.formControlStyles}
                            />
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
                            <Form.Control.Feedback type="invalid">
                                Please choose a Password.
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
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                value={email}
                                type="email"
                                placeholder="E-mail"
                                style={styles.formControlStyles}
                                required
                            />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Please enter your E-mail.
                        </Form.Control.Feedback>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            sm="12"
                            controlId="city"
                            style={styles.formGroupStyles}
                        >
                            <Form.Control
                                onChange={(e) => setCity(e.target.value)}
                                name="city"
                                value={city}
                                type="text"
                                placeholder="City"
                                style={styles.formControlStyles}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the City you are located in.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm="12"
                            controlId="state"
                            style={styles.formGroupStyles}
                        >
                            <Form.Control
                                onChange={(e) => setState(e.target.value)}
                                name="state"
                                value={state}
                                type="text"
                                placeholder="State"
                                style={styles.formControlStyles}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the State that you currently living
                                on.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            sm="12"
                            controlId="zipCode"
                            style={styles.formGroupStyles}
                        >
                            <Form.Control
                                onChange={(e) => setZipCode(e.target.value)}
                                name="zipCode"
                                value={zipCode}
                                type="text"
                                placeholder="Zip-Code"
                                style={styles.formControlStyles}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the Zip-Code.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group></Form.Group>
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
        // backgroundColor: 'green',
    },
};

export default FormComponent;
