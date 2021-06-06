import React from 'react';
import { Card, Button } from 'react-bootstrap';

const InvestingListTable = ({
    setStockName,
    setStockSymbol,
    setEstimatedCost,
    setEstimatedShares,
    setDifferenceInCost,
    handleShowSellStockModal,
    currentStocks,
}) => {
    const handleSellStockInfoOnSelect = (e) => {
        const stockCompanyName =
            e.currentTarget.parentElement.childNodes[0].childNodes[0]
                .textContent;
        const selectedStockSymbol =
            e.currentTarget.parentElement.childNodes[0].childNodes[1].textContent.slice(
                1,
                -1,
            );
        const userEstimatedCost =
            e.currentTarget.parentElement.childNodes[1].childNodes[1]
                .textContent;

        const userEstimatedShares =
            e.currentTarget.parentElement.childNodes[3].childNodes[1]
                .textContent;

        const differenceInCost =
            e.currentTarget.parentElement.childNodes[2].childNodes[1]
                .textContent;

        setStockName(stockCompanyName);
        setStockSymbol(selectedStockSymbol);
        setEstimatedCost(userEstimatedCost);
        setEstimatedShares(userEstimatedShares);
        setDifferenceInCost(differenceInCost);
    };

    const investingTable = currentStocks.map((stock, num) => {
        return (
            <Card style={{ width: '20rem' }} key={num}>
                <Card.Body>
                    <Card.Title style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <span style={{ width: '100%' }}>
                            {stock.companyName}
                        </span>
                        <span>({stock.symbol})</span>
                    </Card.Title>
                    <Card.Subtitle
                        className="mb-2 text-muted"
                        stlye={{ height: '2rem' }}
                    >
                        (${stock.userEstimatedHolding})
                    </Card.Subtitle>
                    <Card.Subtitle
                        className="mb-2 text-muted"
                        stlye={{ height: '2rem' }}
                    >
                        (${stock.differenceInCost}) Today
                    </Card.Subtitle>
                    <Card.Subtitle
                        className="mb-5 text-muted"
                        stlye={{ height: '2rem' }}
                    >
                        (Total Shares: {stock.userEstimatedShares})
                    </Card.Subtitle>
                    <Button
                        onClick={(e) => {
                            handleShowSellStockModal();
                            handleSellStockInfoOnSelect(e);
                        }}
                        block
                    >
                        sell
                    </Button>
                </Card.Body>
            </Card>
        );
    });

    return (
        <div style={styles.mainDiv}>
            <h1
                id="investing-table-title"
                className="w-100 mx-auto"
                style={styles.investingTitle}
            >
                INVESTING
            </h1>
            <div
                className="d-flex justify-content-around flex-wrap"
                style={styles.bordersDivs}
            >
                {investingTable.length === 0 ? (
                    <div>
                        <h1>
                            Search for a stock and start investing with fantasy
                            money
                        </h1>
                        <h1>Remember: either go BIG or go HOME!!</h1>
                    </div>
                ) : (
                    investingTable
                )}
            </div>
        </div>
    );
};

var styles = {
    mainDiv: {
        width: '75%',
        margin: 'auto',
    },
    investingTitle: {
        captionSide: 'top',
        fontSize: '3rem',
        fontWeight: 'bold',
        color: 'black',
    },

    bordersDivs: {
        padding: '25px',
        boxShadow: '6px 16px 64px rgb(179, 178, 178)',
    },
};

export default InvestingListTable;
