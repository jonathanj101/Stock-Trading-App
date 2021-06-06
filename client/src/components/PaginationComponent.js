import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({
    investingListLength,
    handlePageChange,
    stocksPerPage,
}) => {
    let array = [];
    for (let i = 1; i <= Math.ceil(investingListLength / stocksPerPage); i++) {
        array.push(i);
    }

    return (
        <div style={{ margin: '0' }}>
            {investingListLength > 0 ? (
                <Pagination style={styles.paginationContainer}>
                    {array.map((number) => {
                        return (
                            <Pagination.Item
                                key={number}
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </Pagination.Item>
                        );
                    })}
                </Pagination>
            ) : (
                <div></div>
            )}
        </div>
    );
};

const styles = {
    paginationContainer: {
        justifyContent: 'center',
        fontSize: '1.25rem',
        marginTop: '25px',
    },
};

export default PaginationComponent;
