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
    mainState,
    addStockToInvestingTable,
}) => {
    const [show, setShow] = useState(false);
    const [buyingStockQuantity, setBuyingStockQuantity] = useState('');
    const [userBuyingStock, setUserBuyingStock] = useState('');
    const [estimatedShares, setEstimatedShares] = useState('0.00');
    const [estimatedCost, setEstimatedCost] = useState('0.00');
    const [stockInputValue, setStockInputValue] = useState('0.00');
    const [stockName, setStockName] = useState('');
    const [stockPrice, setStocPrice] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [stockChange, setStockChange] = useState('');
    const [dropdownTitle, setDropdownTitle] = useState('Dollars');
    const [dropdownItemTitle, setDropdownItemTitle] = useState('Shares');

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setDropdownTitle('Dollars');
        setDropdownItemTitle('Shares');
        setUserBuyingStock('$0.00');
        setEstimatedShares('0.00');
        setEstimatedShares('$0.00');
    };

    const handleSubmit = () => {
        handleTransactions(stockSymbol);
        addToInvesting({
            companyName: stockName,
            symbol: stockSymbol,
            stockCost: stockPrice,
            stockChange: stockChange,
        });
        handleTransactions({
            companyName: stockName,
            symbol: stockSymbol,
            estimatetShares: estimatedShares,
            stockPrice: stockPrice,
        });
    };

    const addToInvesting = (stockInfo) => {
        addStockToInvestingTable(stockInfo);
    };

    const isNan = (isNan) => {
        console.log(isNan);
        // console.log(dropdownTitle);
        // console.log(isNan.toString());
        if (isNan.toString() !== 'NaN' && dropdownTitle === 'Dollars') {
            // console.log(dropdownTitle);
            setEstimatedShares(isNan);
            // console.log('yes');
        } else if (isNan.toString() !== 'NaN' && dropdownTitle === 'Shares') {
            // console.log(dropdownTitle);
            setEstimatedCost(`$ ${isNan}`);
            // console.log('yes 2');
        }
    };

    const handleUserStockInput = (e) => {
        const { value } = e.currentTarget;
        setUserBuyingStock(value);
    };

    const calculateOnTitleChange = (dropDownTitle) => {
        console.log(dropDownTitle);
        const parseStockInputValue = parseFloat(stockInputValue);
        console.log(parseStockInputValue);
        // const parseSlicedStockPrice = parseFloat(estimatedTotal.slice(1, -1));

        if (dropDownTitle === 'Dollars') {
            console.log('ok');
            console.log(parseStockInputValue);
            console.log(estimatedCost);
            const totalShares = parseStockInputValue / estimatedCost;
            console.log(totalShares);
            setEstimatedShares(totalShares);
            if (totalShares.toString() !== 'NaN') {
                console.log('ok');
                console.log(estimatedCost);
            } else {
                console.log('nan');
                setEstimatedShares('0.00');
            }
        } else {
            console.log('else');
            console.log(dropDownTitle);
            console.log(estimatedCost);
            const totalStockCost = estimatedShares * parseStockInputValue;
            console.log(totalStockCost);
            if (totalStockCost.toString() !== 'NaN') {
                console.log('ok');
                setEstimatedCost(totalStockCost);
                console.log(totalStockCost);
            } else {
                console.log('nan');
                setEstimatedCost('$0.00');
            }
        }
    };

    const calculateCost = (stockInput) => {
        const { value } = stockInput.currentTarget;
        let slicedStockPrice = stockPrice.slice(1, -1);
        let parseSlicedStockPrice = parseFloat(slicedStockPrice);
        let parseStockInput = parseFloat(value);
        if (dropdownTitle === 'Dollars') {
            const totalShares = parseStockInput / parseSlicedStockPrice;
            console.log(`cost in dollars ${totalShares}`);
            isNan(totalShares);
        } else {
            console.log(dropdownTitle);
            console.log(userBuyingStock);
            const totalCost = parseSlicedStockPrice * parseStockInput;
            console.log(`total shares ${totalCost}`);
            isNan(totalCost);
        }
    };

    const handleStockInfoOnSelect = (e) => {
        const stockCompanyName =
            e.currentTarget.childNodes[0].childNodes[0].textContent;
        const stockCost =
            e.currentTarget.childNodes[1].childNodes[0].textContent;
        const stockChange =
            e.currentTarget.childNodes[1].childNodes[1].textContent;
        const stockSymbol =
            e.currentTarget.childNodes[0].childNodes[1].textContent;
        console.log(stockCompanyName, stockCost);
        setStockName(stockCompanyName);
        setStocPrice(stockCost);
        setStockSymbol(stockSymbol);
        setStockChange(stockChange);
    };

    const handleDropdownTitle = (e) => {
        const ele = e.currentTarget.textContent;
        calculateOnTitleChange(ele);
        // console.log(ele);
        setDropdownTitle(ele);
        // console.log(`dropdown title ${dropdownTitle}`);
        setDropdownItemTitle(dropdownTitle);
        // console.log(`dropdownItemTitle ${dropdownItemTitle}`);
    };

    const investingTable = investingList.map((stock, num) => {
        return (
            <Card style={{ width: '20rem' }} key={num}>
                <Card.Body>
                    <Card.Title style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <span style={{ width: '100%' }}>
                            {stock.companyName}
                        </span>
                        <span>({stock.symbol})</span>
                    </Card.Title>
                    <Card.Subtitle
                        className="mb-5 text-muted"
                        stlye={{ height: '2rem' }}
                    >
                        ({stock.stockCost}) Today ({stock.stockChange})
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
                    handleStockInfoOnSelect(e);
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
                mainState={mainState}
                addStockToInvestingTable={addStockToInvestingTable}
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
                                            name={userBuyingStock}
                                            value={userBuyingStock}
                                            onChange={(e) => {
                                                handleUserStockInput(e);
                                                calculateCost(e);
                                                setStockInputValue(
                                                    e.currentTarget.value,
                                                );
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
                                {/* <Form.Row>
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
                                </Form.Row> */}
                                <div className="w-100 d-flex justify-content-between text-center mx-auto">
                                    <h5>
                                        {dropdownTitle === 'Dollars'
                                            ? 'Estimated Shares'
                                            : 'Estimated Cost'}
                                    </h5>
                                    <h5>
                                        {dropdownTitle === 'Dollars'
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

            <div className="w-75 mx-auto">
                <h1 className="w-100 mx-auto" style={styles.investingTitle}>
                    INVESTING
                </h1>
                <div
                    className="d-flex justify-content-around flex-wrap mb-5"
                    style={styles.bordersDivs}
                >
                    {investingTable.length === 0 ? (
                        <div>
                            <h1>
                                Search for a stock and start investing with
                                fantasy money
                            </h1>
                            <h1>Remember: either go BIG or go HOME!!</h1>
                        </div>
                    ) : (
                        investingTable
                    )}
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
