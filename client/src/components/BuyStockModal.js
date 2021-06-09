import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import AlertMsgComponent from './AlertMsgComponent';

const BuyStockModal = ({
    showBuyStockModal,
    setIsStockQuantity,
    calculateCost,
    calculateOnTitleChange,
    handleUserStockInput,
    estimatedCost,
    estimatedShares,
    isStockQuantity,
    stockName,
    stockSymbol,
    stockPrice,
    addStock,
    setStockInputValue,
    setEstimatedShares,
    setEstimatedCost,
    setShow,
    userHoldings,
    stockInputValue,
}) => {
    const [dropdownTitle, setDropdownTitle] = useState('Dollars');
    const [dropdownItemTitle, setDropdownItemTitle] = useState('Shares');
    const [showAlertMessage, setShowAlertMessageComponent] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        console.log(stockInputValue);
        if (stockInputValue <= userHoldings) {
            onBuyHandler();
            addStock();
            setTimeout(() => {
                handleClose();
            }, 2000);
        } else {
            setShowAlertMessageComponent(true);
            setErrorMessage(
                "You don't have enough buying power! Please buy accordingly to your wallet limit.",
            );
        }
    };

    const onBuyHandler = async () => {
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        const parsed = parseFloat(stockPrice.slice(1));
        try {
            const response = await axios.post('/add_stock', {
                id: localStorageUserId,
                company_name: stockName,
                stockCost: parsed,
                stockSymbol: stockSymbol,
                estimatedShares: estimatedShares,
                estimatedCost: estimatedCost,
                userHoldings: userHoldings,
            });
            setShowAlertMessageComponent(true);
            const message = response.data;
            setSuccessMessage(message);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDropdownTitle = () => {
        calculateOnTitleChange();
        setDropdownTitle(dropdownItemTitle);
        setDropdownItemTitle(dropdownTitle);
        setIsStockQuantity(!isStockQuantity);
    };

    const handleClose = () => {
        setShowAlertMessageComponent(false);
        setShow(false);
        setStockInputValue('$0.00');
        setEstimatedShares('0.00');
        setEstimatedCost('$0.00');
    };

    return (
        <div>
            <Modal
                show={showBuyStockModal}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Buy {stockName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlertMsgComponent
                        show={showAlertMessage}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />
                    <div>
                        <div style={styles.stockInfoDiv}>
                            {stockSymbol} = {stockPrice}
                        </div>
                        <div className="mx-auto w-50 mt-5 mb-5">
                            <div className="d-flex justify-content-center">
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={
                                        dropdownTitle
                                            ? dropdownTitle
                                            : dropdownItemTitle
                                    }
                                >
                                    <Dropdown.Item
                                        onClick={(e) => handleDropdownTitle()}
                                        as="button"
                                        eventKey="Shares"
                                    >
                                        {dropdownItemTitle
                                            ? dropdownItemTitle
                                            : dropdownTitle}
                                    </Dropdown.Item>
                                </DropdownButton>
                                <div className="w-100">
                                    <Form.Row>
                                        <Form.Control
                                            required
                                            type="number"
                                            onChange={(e) => {
                                                handleUserStockInput(e);
                                                calculateCost(e);
                                            }}
                                            placeholder={
                                                dropdownTitle === 'Dollars'
                                                    ? '$0.00'
                                                    : '0'
                                            }
                                        />
                                    </Form.Row>
                                </div>
                            </div>
                            <div className="w-100">
                                <div className="w-100 d-flex justify-content-between text-center mx-auto">
                                    <h5>
                                        {dropdownTitle === 'Dollars'
                                            ? 'Estimated Shares'
                                            : 'Estimated Cost'}
                                    </h5>
                                    <h5>
                                        {isStockQuantity
                                            ? estimatedShares
                                            : estimatedCost}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-center mx-auto">
                        <h4>${userHoldings} available to buy stock </h4>
                        <Button onClick={() => handleSubmit()} block>
                            Buy
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

export default BuyStockModal;
