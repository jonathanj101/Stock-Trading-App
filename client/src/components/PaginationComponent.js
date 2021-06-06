import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ investingListLength }) => {
    console.log(investingListLength);
    let array = [];
    for (let i = 1; i <= Math.ceil(investingListLength / 5); i++) {
        array.push(i);
    }
    return (
        <div>
            <Pagination>
                <Pagination.First />
                {array.map((number) => {
                    return <Pagination.Item>{number}</Pagination.Item>;
                })}
                <Pagination.Last />
            </Pagination>
        </div>
    );
};

export default PaginationComponent;
