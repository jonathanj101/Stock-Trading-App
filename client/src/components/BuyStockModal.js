import React, { useState } from 'react';
import { Button, Modal, DropdownButton, Dropdown, Form } from 'react-bootstrap';

const BuyStockModal = ({
    show,
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
    handleSubmit,
    setStockInputValue,
    setEstimatedShares,
    setEstimatedCost,
    setShow,
}) => {
    const [dropdownTitle, setDropdownTitle] = useState('Dollars');
    const [dropdownItemTitle, setDropdownItemTitle] = useState('Shares');

    const handleDropdownTitle = (e) => {
        const ele = e.currentTarget.textContent;
        calculateOnTitleChange();
        setDropdownTitle(dropdownItemTitle);
        setDropdownItemTitle(dropdownTitle);
        setIsStockQuantity(!isStockQuantity);
    };

    const handleClose = () => {
        setShow(false);
        setStockInputValue('$0.00');
        setEstimatedShares('0.00');
        setEstimatedCost('$0.00');
    };

    return (
        <div>
            <Modal
                show={show}
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
                                        onClick={(e) => handleDropdownTitle(e)}
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
                        <h4>$0.00 available to buy stock </h4>
                        <Button
                            onClick={() => {
                                handleClose();
                                handleSubmit();
                            }}
                            block
                        >
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
