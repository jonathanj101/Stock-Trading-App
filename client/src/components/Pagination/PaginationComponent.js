import React from 'react';
import { Pagination } from 'react-bootstrap';
import { styles } from './PaginationStyles';

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
export default PaginationComponent;
