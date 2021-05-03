import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const SellStockModal = ({
    showSellStockModal,
    setSellStockModal,
    stockName,
    stockSymbol,
    estimatedCost,
}) => {
    const [stockPrice, setStockPrice] = useState('');
    const [totalHoldingsOnSell, setTotalHoldingsOnSell] = useState('');

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
                    <div style={styles.stockInfoDiv}>
                        {stockSymbol} = ${estimatedCost}
                    </div>
                    <div className="w-100">
                        <Form.Row>
                            <Form.Control
                                required
                                type="number"
                                placeholder={'ok'}
                            />
                        </Form.Row>
                    </div>
                    <div className="d-flex justify-content-between">
                        <h4>Total Selling: $0</h4>
                        <Button variant="primary">Sell all</Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-center mx-auto">
                        <h4>$0.00 available of Holdings</h4>
                        <Button
                            className="mt-5"
                            variant="primary"
                            onClick={handleClose}
                            block
                        >
                            Sell
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

var styles = {
    stockInfoDiv: {
        text: 'center',
        marginTop: '20px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
};

export default SellStockModal;
