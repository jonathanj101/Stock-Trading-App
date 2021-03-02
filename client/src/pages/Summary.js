import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';

const SummaryComponent = ({ apple, facebook, tesla }) => {
    console.log(apple, facebook, tesla);
    return (
        <div>
            <div className="w-75 mx-auto">
                <h1 className="w-100 mx-auto" style={styles.investingTitle}>
                    Investing
                </h1>
                <div
                    className="d-flex justify-content-around flex-wrap mb-5"
                    style={styles.bordersDivs}
                >
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>
                                {apple.company_name} ({apple.symbol})
                            </Card.Title>
                            <Card.Subtitle
                                className="mb-5 text-muted"
                                stlye={{ height: '2rem' }}
                            >
                                (${apple.latestPrice}) Today
                            </Card.Subtitle>
                            <Button href="#" block>
                                sell
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>
                                {facebook.company_name} ({facebook.symbol})
                            </Card.Title>
                            <Card.Subtitle
                                className="mb-5 text-muted"
                                stlye={{ height: '2rem' }}
                            >
                                (${facebook.latestPrice}) Today
                            </Card.Subtitle>
                            <Button className="" href="#" block>
                                sell
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="w-100" style={{ marginBottom: '55px' }}>
                    <Table
                        className="text-center mx-auto"
                        striped
                        bordered
                        hover
                    >
                        <caption style={styles.caption}>List</caption>
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
                                    company name
                                    <span>symbol</span>
                                </td>
                                <td>
                                    cost
                                    <span className="d-flex flex-column">
                                        difference
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="d-flex flex-column">
                                    company name
                                    <span>symbol</span>
                                </td>
                                <td>
                                    cost
                                    <span className="d-flex flex-column">
                                        difference
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="d-flex flex-column">
                                    company name
                                    <span>symbol</span>
                                </td>
                                <td>
                                    cost
                                    <span className="d-flex flex-column">
                                        difference
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
