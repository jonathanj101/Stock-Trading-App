import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const AlertMsgComponent = ({ setShow, errMsg, show }) => {
    console.log(show);
    return (
        <div>
            <Alert show={show} variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Change this and that and try again. Duis mollis, est non
                    commodo luctus, nisi erat porttitor ligula, eget lacinia
                    odio sem nec elit. Cras mattis consectetur purus sit amet
                    fermentum.
                </p>
            </Alert>
        </div>
    );
};

export default AlertMsgComponent;
