import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormComponent = () => {
    return (
        <div style={styles.mainDiv}>
            <div style={styles.div}>
                <Form style={styles.formContainer}>
                    <div className="d-flex ">
                        <Form.Group
                            style={styles.formGroupStyles}
                            className="w-50 mr-3"
                            controlId="firstName"
                        >
                            <Form.Control
                                style={styles.formControlStyles}
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
                                placeholder="Last name"
                            />
                        </Form.Group>
                    </div>
                    <Form.Group controlId="email">
                        <Form.Control
                            style={styles.formControlStyles}
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
        backgroundColor: 'grey',
    },
    formGroupStyles: {
        margin: '100px auto',
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
        backgroundColor: 'red',
        width: '100%',
        height: '100%',
    },
};

export default FormComponent;
