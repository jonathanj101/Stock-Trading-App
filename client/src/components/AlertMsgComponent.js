import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMsgComponent = ({ successMsg, errMsg, show }) => {
    return (
        <div>
            <Alert
                show={true}
                variant={successMsg === '' ? 'danger' : 'success'}
            >
                <Alert.Heading>
                    {successMsg === '' ? errMsg : successMsg}
                </Alert.Heading>
            </Alert>
        </div>
    );
};

export default AlertMsgComponent;
