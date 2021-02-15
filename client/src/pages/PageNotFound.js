import React from 'react';

const PageNotFound = () => {
    return (
        <div>
            <div style={styles.msgDiv}>
                <h1>404 Page not found</h1>
            </div>
        </div>
    );
};

var styles = {
    msgDiv: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '500px 0',
    },
};

export default PageNotFound;
