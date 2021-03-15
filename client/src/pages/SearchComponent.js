import React, { useState } from 'react';
import { Form, InputGroup, ListGroup } from 'react-bootstrap';

const SearchComponent = ({ mainState }) => {
    const [textInput, setTextInput] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [companyName, setCompanyName] = useState('');
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
                    <ListGroup flush className="d-flex flex-row">
                        <ListGroup.Item
                            style={styles.ListGroupItem}
                            className=""
                            action
                            variant=""
                        >
                            {companyName}
                        </ListGroup.Item>
                        <ListGroup.Item
                            style={styles.ListGroupItem2}
                            className=""
                            action
                            variant=""
                        >
                            {stockSymbol}
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
    ListGroupItem: {
        borderLeft: 'none',
        borderRight: '1px solid rgba(0,0,0,.125)',
        borderTop: 'nonr',
        borderBottom: 'none',
    },

    ListGroupItem2: {
        borderLeft: '1px solid rgba(0,0,0,.125)',
        borderRight: 'none',
        borderTop: 'nonr',
        borderBottom: 'none',
    },
};

export default SearchComponent;
