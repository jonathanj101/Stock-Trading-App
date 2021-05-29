import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMsgComponent = ({ successMsg, errMsg, show }) => {
    return (
        <div>
            <Alert
                id="alert_message_container"
                show={successMsg}
                variant={successMsg === '' ? 'danger' : 'success'}
            >
                <Alert.Heading id="alert_message" style={{ fontSize: '1rem' }}>
                    {successMsg === '' ? errMsg : successMsg}
                </Alert.Heading>
            </Alert>
        </div>
    );
};

export default AlertMsgComponent;
