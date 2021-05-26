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
    userHoldings,
    setCounter,
    difInCost,
}) => {
    const [userSellingAmount, setUserSellingAmount] = useState('');
    const [totalHoldingsOnSell, setTotalHoldingsOnSell] = useState('');
    const [userInput, setUserInput] = useState('');
    const [totalSelling, setTotalSelling] = useState('0.00');
    const [totalOwned, setTotalOwned] = useState('0.00');
    const [totalProfit, setTotalProfit] = useState(
        parseFloat(difInCost) + parseFloat(estimatedCost),
    );
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            onSellHandler();
            setValidated(false);
            handleClose();
            setCounter(true);
        }
    };

    const onSellHandler = async () => {
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        await axios
            .post('/sell_stock', {
                id: localStorageUserId,
                companyName: stockName,
                stockSymbol: stockSymbol,
                estimatedShares: estimatedShares,
                userSellingAmount: userSellingAmount,
            })

            .then((data) => console.log(data));
    };

    const handleClose = () => {
        setSellStockModal(false);
        clearForm();
    };

    const clearForm = () => {
        setUserSellingAmount('');
        setTotalHoldingsOnSell('');
        setUserInput('');
        setTotalSelling('0.00');
        setTotalOwned('0.00');
        setValidated(false);
    };

    const getTextInput = (e) => {
        const { value } = e.currentTarget;
        const parsedValue = parseFloat(value);
        console.log(value);
        if (value !== '+' || value !== '-') {
            setUserInput(parsedValue);
            calculateAmountSellingOnInputChange(parsedValue);
        } else {
            return;
        }
    };

    const calculateAmountSellingOnInputChange = (value) => {
        const parsedEstimatedCost = parseFloat(estimatedCost);
        const totalSelling = parsedEstimatedCost - value;
        if (value !== '' && isNaN(!value)) {
            console.log(value);
            console.log(isNaN(value));
            console.log(parsedEstimatedCost);
            console.log(totalSelling);
            setTotalSelling(value);
            setUserSellingAmount(value);
            setTotalOwned(totalSelling);
        } else {
            setTotalOwned('$0.00');
            setTotalSelling('$0.00');
            setTotalProfit(parseFloat(difInCost) + parsedEstimatedCost);
            return;
        }
    };

    const sellAll = () => {
        const parsedEstimatedCost = parseFloat(estimatedCost);
        const parsedDifInCost = parseFloat(difInCost);
        const totalProfit = parsedDifInCost + parsedEstimatedCost;
        const totalOwned = totalProfit - totalProfit;
        console.log(parsedEstimatedCost);
        console.log(difInCost);
        console.log(parsedDifInCost);
        console.log(totalProfit);
        setTotalSelling(totalProfit);
        setTotalOwned(totalOwned);
        setUserSellingAmount(parsedEstimatedCost);
        setUserInput(totalProfit);
        setTotalProfit(totalProfit);
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
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={(e) => {
                        handleSubmit(e);
                        console.log('clicked');
                    }}
                    method="POST"
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
                            <div>Profit = {difInCost}</div>
                            <div>Total = {totalProfit} </div>
                        </div>
                        <div className="w-75 mx-auto">
                            <Form.Row className="mb-5">
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
                                <Form.Control.Feedback>
                                    Looks good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please type in the amount you want to sell!!
                                </Form.Control.Feedback>
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
                            <h4>${userHoldings} available</h4>
                            <Button
                                className="mt-5"
                                variant="primary"
                                block
                                type="submit"
                            >
                                Sell
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
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
