import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMsgComponent = ({ successMessage, errorMessage, show }) => {
    return (
        <div>
            <Alert
                id="alert_message_container"
                show={show}
                variant={successMessage === '' ? 'danger' : 'success'}
            >
                <Alert.Heading id="alert_message" style={{ fontSize: '1rem' }}>
                    {successMessage === '' ? errorMessage : successMessage}
                </Alert.Heading>
            </Alert>
        </div>
    );
};

export default AlertMsgComponent;
