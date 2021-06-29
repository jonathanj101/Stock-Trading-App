import React from 'react';
import { Modal } from 'react-bootstrap';

const LogOutModal = ({ show, handleClose }) => {
    return (
        <div>
            <Modal show={show} onHide={() => handleClose(false)}>
                <Modal.Header>
                    <Modal.Title>Successfully Loggged-off</Modal.Title>
                </Modal.Header>
            </Modal>
        </div>
    );
};

export default LogOutModal;
