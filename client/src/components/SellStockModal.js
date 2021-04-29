import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const SellStockModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Modal
                show={show}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
                centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sell
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Sell
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SellStockModal;
