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
        <div>
            <Pagination>
                <Pagination.First />
                {array.map((number) => {
                    return (
                        <Pagination.Item
                            // href="!#"
                            key={number}
                            onClick={() => handlePageChange(number)}
                        >
                            {number}
                        </Pagination.Item>
                    );
                })}
                <Pagination.Last />
            </Pagination>
        </div>
    );
};

export default PaginationComponent;
