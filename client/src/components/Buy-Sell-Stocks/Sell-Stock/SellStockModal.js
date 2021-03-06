import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import AlertMsgComponent from '../../AlertMsgComponent';
import { styles } from './SellStockStyles';

const SellStockModal = ({
    showSellStockModal,
    setSellStockModal,
    stockName,
    stockSymbol,
    estimatedCost,
    estimatedShares,
    userHoldings,
    setCounter,
    differenceInCost,
}) => {
    const [userSellingAmount, setUserSellingAmount] = useState('');
    const [userInput, setUserInput] = useState('');
    const [totalSelling, setTotalSelling] = useState('0.00');
    const [totalOwned, setTotalOwned] = useState('0.00');
    const [totalProfit, setTotalProfit] = useState();
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            onSellHandler();
            setValidated(false);
            setTimeout(() => {
                handleClose();
                setCounter(true);
            }, 2000);
        }
    };

    const onSellHandler = async () => {
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        const response = await axios.post('/sell_stock', {
            id: localStorageUserId,
            companyName: stockName,
            stockSymbol: stockSymbol,
            estimatedShares: estimatedShares,
            userSellingAmount: userSellingAmount,
        });
        const message = response.data;
        setSuccessMessage(message);
        setShow(true);
    };

    const handleClose = () => {
        setSellStockModal(false);
        clearForm();
    };

    const clearForm = () => {
        setUserSellingAmount('');
        setUserInput('');
        setTotalSelling('0.00');
        setTotalOwned('0.00');
        setTotalProfit();
        setValidated(false);
        setShow(false);
    };

    const getTextInput = (e) => {
        const { value } = e.currentTarget;
        const parsedValue = parseFloat(value);
        if (value !== '+' || value !== '-') {
            setUserInput(parsedValue);
            calculateAmountSellingOnInputChange(parsedValue);
        } else {
            return;
        }
    };

    const calculateAmountSellingOnInputChange = (value) => {
        const parsedEstimatedCost = parseFloat(estimatedCost);
        const totalProfit = parseFloat(differenceInCost) + parsedEstimatedCost;
        const totalSelling = totalProfit - value;
        if (value > totalProfit) {
            setTotalOwned('0.00');
            setTotalSelling(totalProfit);
        } else {
            if (Number.isNaN(value) !== true) {
                setTotalSelling(value);
                setUserSellingAmount(value);
                setTotalOwned(totalSelling);
                setTotalProfit(totalProfit);
            } else {
                setTotalOwned('0.00');
                setTotalSelling('0.00');
                setTotalProfit(
                    parseFloat(differenceInCost) + parsedEstimatedCost,
                );
                return;
            }
        }
    };

    const sellAll = () => {
        const parsedEstimatedCost = parseFloat(estimatedCost);
        const parsedDifInCost = parseFloat(differenceInCost);
        const totalProfit = parsedDifInCost + parsedEstimatedCost;
        const totalOwned = totalProfit - totalProfit;
        setTotalSelling(totalProfit);
        setTotalOwned(totalOwned);
        setUserSellingAmount(parsedEstimatedCost);
        setUserInput(totalProfit);
        setTotalProfit(totalProfit);
    };

    return (
        <div>
            <Modal
                id="sell-modal"
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
                    }}
                    method="POST"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Sell {stockName}
                        </Modal.Title>
                    </Modal.Header>
                    <AlertMsgComponent
                        show={show}
                        successMessage={successMessage}
                    />
                    <Modal.Body>
                        <div style={styles.stockInfoDiv} id="stock-info-div">
                            <span>
                                {stockSymbol} = ${estimatedCost}
                            </span>
                            <span>Shares = {estimatedShares}</span>
                            <span>Profit = {differenceInCost}</span>
                            <span>Total = {totalProfit} </span>
                        </div>
                        <div className="w-100 mx-auto" id="stock-info-2div">
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
                                        id="sell-btn"
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

export default SellStockModal;
