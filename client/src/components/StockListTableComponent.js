import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const StockListTableComponent = ({
    handleShowBuyStockModal,
    setStockName,
    setStockPrice,
    setStockSymbol,
}) => {
    const [stocksList, setStocksList] = useState([]);

    useEffect(() => {
        if (stocksList.length === 0) {
            const fetchMultipleStocks = async () => {
                let multipleStocksData = await axios.get('/multiple_stocks');
                handleRequest(multipleStocksData);
            };
            fetchMultipleStocks();
        } else {
            return;
        }
    }, [stocksList]);

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

    const handleStockListInfoOnSelect = (e) => {
        const stockName =
            e.currentTarget.childNodes[0].childNodes[0].textContent;
        const stockCost =
            e.currentTarget.childNodes[1].childNodes[0].textContent;
        const stockSymbol =
            e.currentTarget.childNodes[0].childNodes[1].textContent;
        setStockName(stockName);
        setStockPrice(stockCost);
        setStockSymbol(stockSymbol);
    };

    const stocksListTable = stocksList.map((stock, num) => {
        return (
            <tr
                key={num}
                data-toggle="tooltip"
                data-placement="top"
                title="Want to buy? Just click!"
                className="tableRow"
                onClick={(e) => {
                    handleShowBuyStockModal();
                    handleStockListInfoOnSelect(e);
                }}
            >
                <td className="d-flex flex-column">
                    <span
                        id="stock-title"
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        {stock.stockData.company_name}
                    </span>
                    <span id="stock-symbol">{stock.stockData.symbol}</span>
                </td>
                <td>
                    <span
                        id="stock-cost"
                        style={{
                            fontWeight: ' bold',
                        }}
                    >
                        ${stock.stockData.latestPrice}
                    </span>

                    <span id="stock-cost-change" className="d-flex flex-column">
                        ${stock.stockData.change}
                    </span>
                </td>
            </tr>
        );
    });

    return (
        <div style={styles.mainDiv}>
            <Table
                id="table"
                className="text-center mx-auto"
                striped
                bordered
                hover
                style={styles.table}
            >
                <caption id="stock-table-title" style={styles.caption}>
                    LIST
                </caption>
                <thead id="t-head">
                    <tr id="t-row">
                        <th>
                            <h3>Company Name</h3>
                        </th>
                        <th>
                            <h3>Cost Difference</h3>
                        </th>
                    </tr>
                </thead>
                <tbody>{stocksListTable}</tbody>
            </Table>
        </div>
    );
};

const styles = {
    mainDiv: {
        width: '75%',
        margin: 'auto',
    },
    caption: {
        captionSide: 'top',
        fontSize: '3rem',
        fontWeight: 'bold',
        color: 'black',
    },
    table: {
        boxShadow: '6px 32px 72px rgb(179, 178, 178)',
    },
};

export default StockListTableComponent;
