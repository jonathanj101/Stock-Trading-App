import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const SellStockModal = ({
    showSellStockModal,
    setSellStockModal,
    stockName,
    stockSymbol,
    estimatedCost,
}) => {
    const onSellHandler = () => {
        console.log('selling');
    };

    const handleClose = () => {
        setSellStockModal(false);
    };

    return (
        <div>
            <Modal
                show={showSellStockModal}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
                centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sell {stockName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                    {stockName}, {stockSymbol}, {estimatedCost},
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
