import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMsgComponent = ({ errMsg, show }) => {
    return (
        <div>
            <Alert show={show} variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>{errMsg}</p>
            </Alert>
        </div>
    );
};

export default AlertMsgComponent;
