import React, { useState } from 'react';
import { Form, InputGroup, Dropdown } from 'react-bootstrap';

const SearchComponent = ({ handleChange, mainState }) => {
    const [textInput, setTextInput] = useState('');
    const getTextInput = (e) => {
        const { value } = e.currentTarget;
        setTextInput(value);
        handleChange(e);
        fetch(`/testing/${value}`)
            .then((resp) => resp.json())
            .then((data) => console.log(data));
    };

    return (
        <div>
            <Form.Group className=" w-75 mx-auto mt-1">
                <InputGroup>
                    <Form.Control
                        style={styles.formControl}
                        required
                        type="text"
                        name={textInput}
                        value={textInput}
                        placeholder="Search"
                        onChange={getTextInput}
                    />
                    <InputGroup.Prepend>
                        <InputGroup.Text style={styles.inputGroupText}>
                            <i class="fas fa-search"></i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                </InputGroup>
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
};

export default SearchComponent;
