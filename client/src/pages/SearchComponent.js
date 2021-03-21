import React, { useState } from 'react';
import { Form, InputGroup, ListGroup } from 'react-bootstrap';

const SearchComponent = ({ mainState, addStockToInvestingTable }) => {
    const [textInput, setTextInput] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [stockChange, setStockChange] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [stockInfo, setStockInfo] = useState([]);
    const [isStockSearched, setIsStockSearched] = useState(false);

    const getTextInput = (e) => {
        const { value } = e.currentTarget;
        setTextInput(value);
        sendSearchRequest(value);
        setIsStockSearched(true);
    };

    const sendSearchRequest = (textInput) => {
        console.log(textInput);
        fetch(`/testing/${textInput}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                setCompanyName(data.data.company_name);
                setStockSymbol(data.data.symbol);
                setStockPrice(data.data.cost);
                setStockChange(data.data.change);
            });
    };

    const onSelect = (e) => {
        // console.log(e.currentTarget.childNodes[0].childNodes);
        const symbol = e.currentTarget.childNodes[0].childNodes[0].textContent;
        const stockName =
            e.currentTarget.childNodes[0].childNodes[1].textContent;
        const stockCost =
            e.currentTarget.childNodes[0].childNodes[2].textContent;
        setStockInfo({
            symbol: symbol,
            stockName: stockName,
            stockCost: stockCost,
        });
        addStockToInvestingTable({
            symbol: stockSymbol,
            companyName: companyName,
            stockCost: stockPrice,
            stockChange: stockChange,
        });
    };

    return (
        <div>
            <Form.Group className=" w-75 mx-auto mt-1">
                <InputGroup>
                    <Form.Control
                        className=""
                        style={styles.formControl}
                        required
                        type="text"
                        name={textInput}
                        value={textInput}
                        placeholder="Search"
                        onChange={(e) => {
                            getTextInput(e);
                        }}
                    />
                    <InputGroup.Prepend>
                        <InputGroup.Text style={styles.inputGroupText}>
                            <i className="fas fa-search"></i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                </InputGroup>
                {isStockSearched ? (
                    <ListGroup>
                        <ListGroup.Item
                            onClick={(e) => onSelect(e)}
                            style={styles.ListGroupItem}
                            className=""
                            action
                            variant=""
                        >
                            <div style={styles.spanContainer}>
                                <span style={styles.stockSymbolSpan}>
                                    {stockSymbol}
                                </span>
                                <span style={styles.companyNameSpan}>
                                    {companyName}
                                </span>
                                <span>{stockPrice}</span>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                ) : (
                    ''
                )}
            </Form.Group>
        </div>
    );
};

const styles = {
    formControl: {
        fontSize: '2rem',
    },
    inputGroup: {
        margin: '20px auto',
    },
    inputGroupText: {
        fontSize: '2rem',
    },
    ListGroup: {
        display: 'none',
    },
    spanContainer: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    companyNameSpan: {
        margin: 'auto 5% auto auto',
    },
    stockSymbolSpan: {
        margin: 'auto 5% auto auto',
    },
};

export default SearchComponent;
