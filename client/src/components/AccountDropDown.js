import React from 'react';
import { NavDropdown, Button } from 'react-bootstrap';

const AccountDropDown = ({ username, handleLogOutOnNav }) => {
    debugger;
    return (
        <div>
            <NavDropdown title={username} id="basic-nav-dropdown" drop="down">
                <NavDropdown.Item className="d-flex justify-content-between mt-5 mb-5">
                    <div className="d-flex flex-wrap flex-column">
                        <span>$</span>
                        <span>Portfolio Value</span>
                    </div>
                    <div className="d-flex flex-wrap flex-column">
                        <span>$</span>
                        <span>Buying power</span>
                    </div>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <Button
                    block
                    style={styles.button}
                    onClick={() => handleLogOutOnNav}
                >
                    Log Out
                </Button>
            </NavDropdown>
        </div>
    );
};

const styles = {
    button: {
        width: '50%',
        margin: '50px auto 5px',
        fontSize: '1.5rem',
    },
};

export default AccountDropDown;
