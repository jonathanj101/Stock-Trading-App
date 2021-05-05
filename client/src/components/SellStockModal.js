import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const SellStockModal = ({
    showSellStockModal,
    setSellStockModal,
    stockName,
    stockSymbol,
    estimatedCost,
    estimatedShares,
}) => {
    const [stockPrice, setStockPrice] = useState('');
    const [totalHoldingsOnSell, setTotalHoldingsOnSell] = useState('');
    const [userInput, setUserInput] = useState('');
    const [totalSelling, setTotalSelling] = useState('0.00');
    const [totalOwned, setTotalOwned] = useState('0.00');

    const onSellHandler = () => {
        console.log('selling');
    };

    const handleClose = () => {
        setStockPrice('');
        setTotalHoldingsOnSell('');
        setUserInput('');
        setTotalSelling('$0.00');
        setSellStockModal(false);
    };

    const getTextInput = (e) => {
        const { value } = e.currentTarget;
        const parsedValue = parseFloat(value);
        setUserInput(parsedValue);
        calculateAmountSellingOnInputChange(parsedValue);
    };

    const calculateAmountSellingOnInputChange = (value) => {
        const parsedEstimatedCost = parseFloat(estimatedCost);
        const totalSelling = parsedEstimatedCost - value;
        if (value !== '' && value <= parsedEstimatedCost) {
            console.log(totalSelling);
            setTotalSelling(value);
            setTotalOwned(totalSelling);
        } else {
            console.log('greater');
            return;
        }
    };

    const sellAll = () => {
        const parsedEstimatedCost = parseFloat(estimatedCost);
        const totalSelling = parsedEstimatedCost - parsedEstimatedCost;
        setTotalSelling(parsedEstimatedCost);
        setTotalOwned(totalSelling);
        console.log('clicked');
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
                <Modal.Body className="mb-5 mt-5">
                    <div style={styles.stockInfoDiv}>
                        <div>
                            {stockSymbol} = ${estimatedCost}
                        </div>
                        <div>Shares = {estimatedShares}</div>
                    </div>
                    <div className="w-75 mx-auto">
                        <Form.Row>
                            <Form.Control
                                id="userSelling"
                                required
                                type="number"
                                placeholder="$0.00"
                                name={userInput}
                                value={userInput}
                                onChange={(e) => {
                                    getTextInput(e);
                                }}
                            />
                        </Form.Row>
                        <div>
                            <div className="d-flex justify-content-between">
                                <h4>Total Selling: ${totalSelling}</h4>
                                <h4>Total Owned: ${totalOwned}</h4>
                            </div>
                            <div className="text-center mt-5">
                                <Button
                                    className="w-50"
                                    variant="primary"
                                    onClick={() => {
                                        sellAll();
                                    }}
                                >
                                    Sell all
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-center mx-auto">
                        <h4>$0.00 available of Holdings</h4>
                        <Button className="mt-5" variant="primary" block>
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
        display: 'flex',
        justifyContent: 'around',
        flexDirection: 'column',
        margin: '20px auto 20px auto',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        width: '50%',
    },
    stockInfo: {
        fontWeight: 'normal',
    },
};

export default SellStockModal;
