import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Table } from 'react-bootstrap';
import SearchComponent from '../components/SearchComponent';
import BuyStockModal from '../pages/BuyStockModal';

const SummaryComponent = () => {
    const [show, setShow] = useState(false);
    const [estimatedShares, setEstimatedShares] = useState('0.00');
    const [estimatedCost, setEstimatedCost] = useState('$0.00');
    const [stockInputValue, setStockInputValue] = useState('0.00');
    const [stockName, setStockName] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [isStockQuantity, setIsStockQuantity] = useState(true);
    const [stocksList, setStocksList] = useState([]);
    const [investingList, setInvestingList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let multipleStocksData = await axios.get('/multiple');
            handleRequest(multipleStocksData);
        };
        fetchData();
    }, []);

    const handleShow = () => {
        setShow(true);
    };

    const getStockFromSearchAddToModal = (e) => {
        setStockName(e.stockName);
        setStockSymbol(e.stockSymbol);
        setStockPrice(e.stockPrice);
    };

    const handleRequest = async (request) => {
        try {
            const resp = Promise.all(
                request.data.data.map((stock) => {
                    return {
                        stockData: stock,
                    };
                }),
            );
            resp.then((stockData) => {
                setStocksList(stockData);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const isSameStock = (stock) => {
        debugger;
        const sameStock = investingList.find(
            (userStock) => userStock.symbol === stock.symbol,
        );
        if (sameStock) {
            const totalHolding =
                sameStock.userEstimatedHolding + stock.estimatedUserSharesCost;

            const totalSharesHolding =
                sameStock.userEstimatedShares + stock.estimatedUserShares;

            sameStock.userEstimatedHolding =
                sameStock.userEstimatedHolding + stock.estimatedUserSharesCost;

            sameStock.userEstimatedHolding = totalHolding;
            sameStock.userEstimatedShares = totalSharesHolding;
            return sameStock;
        } else {
            return undefined;
        }
    };

    const addStockToInvestingTable = (stock) => {
        debugger;
        const newStockInfoInvestingList = {
            symbol: stock.symbol,
            userEstimatedHolding: stock.estimatedUserSharesCost,
            userEstimatedShares:
                stock.estimatedUserSharesCost / stock.stockPrice,
            companyName: stock.companyName,
        };
        if (investingList.length >= 1) {
            if (isSameStock(stock) === undefined) {
                setInvestingList([...investingList, newStockInfoInvestingList]);
            }
        } else {
            setInvestingList([...investingList, newStockInfoInvestingList]);
        }
    };

    const handleSubmit = () => {
        addToInvesting({
            companyName: stockName,
            symbol: stockSymbol,
            estimatedUserSharesCost: estimatedCost,
            estimatedUserShares: estimatedShares,
            stockPrice: stockPrice.includes('.')
                ? parseFloat(stockPrice.slice(1))
                : parseInt(stockPrice.slice(1)),
        });
    };

    const addToInvesting = (stockInfo) => {
        addStockToInvestingTable(stockInfo);
    };

    const handleUserStockInput = (e) => {
        const { value } = e.currentTarget;
        setStockInputValue(value);
    };

    const calculateOnTitleChange = (dropDownTitle) => {
        const parseStockInputValue = parseFloat(stockInputValue);
        const parseSliceStockCost = stockPrice.includes('.')
            ? parseFloat(stockPrice.slice(1))
            : parseInt(stockPrice.slice(1));

        if (!isStockQuantity) {
            const totalShares = parseStockInputValue / parseSliceStockCost;
            if (!isNaN(totalShares)) {
                setEstimatedShares(totalShares);
                return setEstimatedShares(totalShares);
            } else {
                setEstimatedShares('0.00');
                return setEstimatedShares('0.00');
            }
        } else {
            const totalCost = parseSliceStockCost * parseStockInputValue;
            if (!isNaN(totalCost)) {
                setEstimatedCost(totalCost);
                return setEstimatedCost(totalCost);
            } else {
                setEstimatedCost('$0.00');
                return setEstimatedCost('$0.00');
            }
        }
    };

    const calculateCost = (stockInput) => {
        const { value } = stockInput.currentTarget;
        let parseStockInput = parseFloat(value);
        const parseSliceStockCost = stockPrice.includes('.')
            ? parseFloat(stockPrice.slice(1))
            : parseInt(stockPrice.slice(1));
        if (isStockQuantity) {
            const totalShares = parseStockInput / parseSliceStockCost;
            if (!isNaN(totalShares)) {
                console.log(`cost in shares ${totalShares}`);
                setEstimatedShares(totalShares);
                setEstimatedCost(parseStockInput);
            } else {
                return;
            }
        } else {
            console.log('calc on input totalCost');
            const totalCost = parseSliceStockCost * parseStockInput;
            if (!isNaN(totalCost)) {
                setEstimatedCost(totalCost);
                setEstimatedShares(parseStockInput);
            } else {
                return;
            }
        }
    };

    const handleStockInfoOnSelect = (e) => {
        const stockCompanyName =
            e.currentTarget.childNodes[0].childNodes[0].textContent;
        const stockCost =
            e.currentTarget.childNodes[1].childNodes[0].textContent;
        const stockSymbol =
            e.currentTarget.childNodes[0].childNodes[1].textContent;
        setStockName(stockCompanyName);
        setStockPrice(stockCost);
        setStockSymbol(stockSymbol);
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
                        className="mb-2 text-muted"
                        stlye={{ height: '2rem' }}
                    >
                        (${stock.userEstimatedHolding}) Today
                    </Card.Subtitle>
                    <Card.Subtitle
                        className="mb-5 text-muted"
                        stlye={{ height: '2rem' }}
                    >
                        (Total Shares: {stock.userEstimatedShares})
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
                addStockToInvestingTable={addStockToInvestingTable}
                handleShow={handleShow}
                getStockFromSearchAddToModal={getStockFromSearchAddToModal}
                show={show}
            />

            <BuyStockModal
                show={show}
                stockName={stockName}
                stockSymbol={stockSymbol}
                stockPrice={stockPrice}
                isStockQuantity={isStockQuantity}
                setIsStockQuantity={setIsStockQuantity}
                handleSubmit={handleSubmit}
                calculateOnTitleChange={calculateOnTitleChange}
                calculateCost={calculateCost}
                estimatedCost={estimatedCost}
                estimatedShares={estimatedShares}
                handleUserStockInput={handleUserStockInput}
                setStockInputValue={setStockInputValue}
                setEstimatedCost={setEstimatedCost}
                setEstimatedShares={setEstimatedShares}
                setShow={setShow}
            />

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
                        // 'ok'
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
};

export default SummaryComponent;
