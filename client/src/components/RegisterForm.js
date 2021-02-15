import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormComponent = ({ handleRegister, onSubmit, mainState }) => {
    const [firstName, getFirstName] = useState('');
    const [lastName, getLastName] = useState('');
    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');

    console.log(mainState);
    function getValue(e) {
        // getFirstName(e.target.value);
        // getLastName(e.target.value);
        // getEmail(e.target.value);
        // getPassword(e.target.value);
        // handleRegister(e);
        console.log(
            `firstname > ${firstName} lastname > ${lastName} email > ${email} password > ${password}`,
        );
    }

    return (
        <div style={styles.mainDiv}>
            <div style={styles.div}>
                <form style={styles.formContainer}>
                    <div className="w-50 text-center mx-auto">
                        <h1>Register</h1>
                    </div>
                    <div className="d-flex">
                        <div class="form-group" style={styles.formGroupStyles}>
                            <input
                                type="text"
                                class="form-control"
                                onChange={handleRegister}
                                style={styles.formControlStyles}
                                name={'firstName'}
                                value={mainState.firstName}
                                id="firstName"
                                placeholder="First Name"
                            />
                        </div>
                        <div
                            className="form-group"
                            style={styles.formGroupStyles}
                        >
                            <input
                                type="text"
                                className="form-control"
                                style={styles.formControlStyles}
                                id="lastName"
                                name="lastName"
                                value={mainState.lastName}
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <div
                        className="form-group"
                        style={{
                            border: '1px solid black',
                            borderRadius: '5px',
                        }}
                    >
                        <input
                            type="email"
                            className="form-control"
                            style={styles.formControlStyles}
                            name="email"
                            value={mainState.email}
                            id="email"
                            placeholder="Enter email"
                        />
                    </div>
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                    <div className="form-group" style={styles.formGroupStyles}>
                        <input
                            type="password"
                            name="password"
                            value={mainState.password}
                            className="form-control"
                            style={styles.formControlStyles}
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
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

{
    /* <Form style={styles.formContainer}>
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
            onChange={(e) => {
                getValue(e);
                getFirstName(e.target.value);
                handleRegister(e);
            }}
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
            onChange={(e) => {
                getValue(e);
            }}
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
        onChange={(e) => {
            getValue(e);
        }}
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
        onChange={(e) => getValue(e)}
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
    // onClick={() => onSubmit()}
    block
>
    Submit
</Button>
</Form> */
}
