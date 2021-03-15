import React, { useState } from 'react';
import SearchComponent from '../pages/SearchComponent';
import {
    Card,
    Table,
    Button,
    Modal,
    DropdownButton,
    Dropdown,
    Form,
} from 'react-bootstrap';

const SummaryComponent = ({
    investingList,
    stocksList,
    handleTransactions,
    handleChange,
    mainState,
}) => {
    const [show, setShow] = useState(false);
    const [stockName, setStockName] = useState('');
    const [stockPrice, setStocPrice] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [dropdownTitle, setDropdownTitle] = useState('Dollars');
    const [dropdownItemTitle, setDropdownItemTitle] = useState('Shares');

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setDropdownTitle('Dollars');
        setDropdownItemTitle('Shares');
    };

    const handleSubmit = () => {
        handleTransactions(stockSymbol);
    };

    const handleStockInfo = (e) => {
        const stockCompanyName =
            e.currentTarget.childNodes[0].childNodes[0].textContent;
        const stockCost =
            e.currentTarget.childNodes[1].childNodes[0].textContent;
        const stockSymbol =
            e.currentTarget.childNodes[0].childNodes[1].textContent;
        console.log(stockCompanyName, stockCost);
        setStockName(stockCompanyName);
        setStocPrice(stockCost);
        setStockSymbol(stockSymbol);
    };

    const handleDropdownTitle = (e) => {
        console.log(e);
        const ele = e.currentTarget.textContent;
        console.log(ele);
        setDropdownTitle(ele);
        console.log(`dropdown title ${dropdownTitle}`);
        setDropdownItemTitle(dropdownTitle);
        console.log(`dropdownItemTitle ${dropdownItemTitle}`);
    };

    const investingTable = investingList.map((stock, num) => {
        return (
            <Card style={{ width: '20rem' }} key={num}>
                <Card.Body>
                    <Card.Title style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <span style={{ width: '100%' }}>
                            {stock.stockData.company_name}
                        </span>
                        <span>({stock.stockData.symbol})</span>
                    </Card.Title>
                    <Card.Subtitle
                        className="mb-5 text-muted"
                        stlye={{ height: '2rem' }}
                    >
                        (${stock.stockData.latestPrice}) Today
                    </Card.Subtitle>
                    <Button href="#" block>
                        sell
                    </Button>
                </Card.Body>
            </Card>
        );
    });

    const stocksListTable = stocksList.map((stock, num) => {
        return (
            <tr
                key={num}
                data-toggle="tooltip"
                data-placement="top"
                title="Want to buy? Just click!"
                className="tableRow"
                onClick={(e) => {
                    handleShow();
                    handleStockInfo(e);
                }}
            >
                <td className="d-flex flex-column">
                    <span
                        style={{
                            fontSize: '1.50rem',
                            fontWeight: 'bold',
                        }}
                    >
                        {stock.stockData.company_name}
                    </span>
                    <span>{stock.stockData.symbol}</span>
                </td>
                <td>
                    <span
                        style={{
                            fontSize: '1.50rem',
                            fontWeight: ' bold',
                        }}
                    >
                        ${stock.stockData.latestPrice}
                    </span>

                    <span className="d-flex flex-column">
                        ${stock.stockData.change}
                    </span>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <SearchComponent
                handleChange={handleChange}
                mainState={mainState}
            />
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
                                            step="0.01"
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
                                <Form.Row>
                                    <Form.Control
                                        required
                                        type="number"
                                        step="0.01"
                                        placeholder={
                                            dropdownTitle === 'Dollars'
                                                ? 'Amount'
                                                : 'Shares'
                                        }
                                    />
                                </Form.Row>
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

            <div className="w-75 mx-auto">
                <h1 className="w-100 mx-auto" style={styles.investingTitle}>
                    INVESTING
                </h1>
                <div
                    className="d-flex justify-content-around flex-wrap mb-5"
                    style={styles.bordersDivs}
                >
                    {investingTable}
                </div>
                <div className="w-100" style={{ marginBottom: '55px' }}>
                    <Table
                        className="text-center mx-auto"
                        striped
                        bordered
                        hover
                    >
                        <caption style={styles.caption}>LIST</caption>
                        <thead>
                            <tr>
                                <th>
                                    <h3>Company Name</h3>
                                </th>
                                <th>
                                    <h3>Cost/Difference</h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>{stocksListTable}</tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

var styles = {
    caption: {
        captionSide: 'top',
        fontSize: '3rem',
        fontWeight: 'bold',
        color: 'black',
    },
    table_size: {
        fontSize: '1.5rem',
    },
    investingTitle: {
        captionSide: 'top',
        fontSize: '3rem',
        fontWeight: 'bold',
        color: 'black',
    },

    bordersDivs: {
        border: '1px solid black',
        padding: '50px',
    },
    stockInfoDiv: {
        text: 'center',
        marginTop: '20px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
};

export default SummaryComponent;
