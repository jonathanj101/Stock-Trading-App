import React from 'react';
import { Button } from 'react-bootstrap';

const PageNotFound = () => {
    return (
        <div className="text-center">
            <div style={styles.msgDiv}>
                <h1>404 Page not found</h1>
                <p>The page you're trying to reach is not recognizable.</p>
                <p>
                    Please click on the button below to take you back to main
                    page
                </p>
                <Button hred="/">Home</Button>
            </div>
        </div>
    );
};

var styles = {
    msgDiv: {
        width: '100%',
        height: '100%',
        margin: '500px auto',
    },
};

export default PageNotFound;
