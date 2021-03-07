import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';

const SummaryComponent = ({
    apple,
    facebook,
    tesla,
    qcom,
    american_airline,
    microsoft,
    sony,
    stocks,
}) => {
    console.log(stocks);
    const testing = stocks.map((stock) => {
        console.log(stock.stockData);
    });

    // const stocksData = stocks.map((stock, num) => {
    //     for (const key in stock) {
    //         const test = stock[key];
    //         return (
    //             <Card style={{ width: '18rem' }} key={num}>
    //                 <Card.Body>
    //                     <Card.Title
    //                         style={{ display: 'flex', flexWrap: 'wrap' }}
    //                     >
    //                         <span style={{ width: '100%' }}>
    //                             {test.company_name}
    //                         </span>
    //                         <span>({test.symbol})</span>
    //                     </Card.Title>
    //                     <Card.Subtitle
    //                         className="mb-5 text-muted"
    //                         stlye={{ height: '2rem' }}
    //                     >
    //                         (${test.latestPrice}) Today
    //                     </Card.Subtitle>
    //                     <Button href="#" block>
    //                         sell
    //                     </Button>
    //                 </Card.Body>
    //             </Card>
    //         );
    //     }
    // });
    // console.log(stocksData);
    return (
        <div>
            <div className="w-75 mx-auto">
                <h1 className="w-100 mx-auto" style={styles.investingTitle}>
                    INVESTING
                </h1>
                <div
                    className="d-flex justify-content-around flex-wrap mb-5"
                    style={styles.bordersDivs}
                ></div>
                <div className="w-100" style={{ marginBottom: '55px' }}>
                    <Table
                        className="text-center mx-auto"
                        striped
                        bordered
                        hover
                    >
                        <caption style={styles.caption}>LIST</caption>
                        <thead>
                            <tr>
                                <th>
                                    <h3>Company Name</h3>
                                </th>
                                <th>
                                    <h3>Cost/Difference</h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="d-flex flex-column">
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {apple.company_name}
                                    </span>
                                    <span>{apple.symbol}</span>
                                </td>
                                <td>
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: ' bold',
                                        }}
                                    >
                                        ${apple.latestPrice}
                                    </span>

                                    <span className="d-flex flex-column">
                                        ${apple.change}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="d-flex flex-column">
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {facebook.company_name}
                                    </span>
                                    <span>{facebook.symbol}</span>
                                </td>
                                <td>
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: ' bold',
                                        }}
                                    >
                                        ${facebook.latestPrice}
                                    </span>
                                    <span className="d-flex flex-column">
                                        ${facebook.change}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="d-flex flex-column">
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: ' bold',
                                        }}
                                    >
                                        {tesla.company_name}
                                    </span>
                                    <span>{tesla.symbol}</span>
                                </td>
                                <td>
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: ' bold',
                                        }}
                                    >
                                        ${tesla.latestPrice}
                                    </span>
                                    <span className="d-flex flex-column">
                                        ${tesla.change}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="d-flex flex-column">
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: ' bold',
                                        }}
                                    >
                                        {american_airline.company_name}
                                    </span>
                                    <span>{american_airline.symbol}</span>
                                </td>
                                <td>
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: ' bold',
                                        }}
                                    >
                                        ${american_airline.latestPrice}
                                    </span>
                                    <span className="d-flex flex-column">
                                        ${american_airline.change}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="d-flex flex-column">
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: ' bold',
                                        }}
                                    >
                                        {microsoft.company_name}
                                    </span>
                                    <span>{microsoft.symbol}</span>
                                </td>
                                <td>
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: ' bold',
                                        }}
                                    >
                                        ${microsoft.latestPrice}
                                    </span>
                                    <span className="d-flex flex-column">
                                        ${microsoft.change}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="d-flex flex-column">
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: ' bold',
                                        }}
                                    >
                                        {sony.company_name}
                                    </span>
                                    <span>{sony.symbol}</span>
                                </td>
                                <td>
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: ' bold',
                                        }}
                                    >
                                        ${sony.latestPrice}
                                    </span>
                                    <span className="d-flex flex-column">
                                        ${sony.change}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="d-flex flex-column">
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: ' bold',
                                        }}
                                    >
                                        {qcom.company_name}
                                    </span>
                                    <span>{qcom.symbol}</span>
                                </td>
                                <td>
                                    <span
                                        style={{
                                            fontSize: '1.50rem',
                                            fontWeight: ' bold',
                                        }}
                                    >
                                        ${qcom.latestPrice}
                                    </span>
                                    <span className="d-flex flex-column">
                                        ${qcom.change}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

var styles = {
    caption: {
        captionSide: 'top',
        fontSize: '3rem',
        fontWeight: 'bold',
        color: 'black',
    },
    table_size: {
        fontSize: '1.5rem',
    },
    investingTitle: {
        captionSide: 'top',
        fontSize: '3rem',
        fontWeight: 'bold',
        color: 'black',
    },

    bordersDivs: {
        border: '1px solid black',
        padding: '50px',
    },
};

export default SummaryComponent;
