import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const SellStockModal = ({
    showSellStockModal,
    setSellStockModal,
    stockName,
    stockSymbol,
    estimatedCost,
    onSellHandler,
}) => {
    const handleClose = () => {
        setSellStockModal(false);
    };
    console.log(stockName, estimatedCost);

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
