import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import PaginationComponent from './PaginationComponent';

const InvestingListTable = ({
    setStockName,
    setStockSymbol,
    setEstimatedCost,
    setEstimatedShares,
    setDifferenceInCost,
    setUserBuyingPower,
    handleShowSellStockModal,
    setIsInvesting,
    isInvesting,
}) => {
    const [investingList, setInvestingList] = useState([]);

    useEffect(() => {
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        try {
            const fetchUserInvestingList = async () => {
                const response = await axios.post('/user_stock', {
                    id: localStorageUserId,
                });
                return response;
            };
            fetchUserInvestingList().then((data) => {
                setInvestingList(data.data.stock);
                setIsInvesting(false);
            });
            const fetchUser = async () => {
                const response = await axios.post('/user', {
                    id: localStorageUserId,
                });
                return response;
            };
            fetchUser().then((data) => {
                setUserBuyingPower(data.data.user_holdings);
            });
        } catch (err) {
            console.log(err);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInvesting]);

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

    const investingTable = investingList.map((stock, num) => {
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
        <div>
            <div className=" col-sm-12">
                <h1
                    id="investing-table-title"
                    className="w-100 mx-auto"
                    style={styles.investingTitle}
                >
                    INVESTING
                </h1>
                <div
                    className="d-flex justify-content-around flex-wrap mb-5"
                    style={styles.bordersDivs}
                >
                    {investingTable.length === 0 ? (
                        <div>
                            <h1>
                                Search for a stock and start investing with
                                fantasy money
                            </h1>
                            <h1>Remember: either go BIG or go HOME!!</h1>
                        </div>
                    ) : (
                        investingTable
                    )}
                </div>
                <PaginationComponent
                    investingListLength={investingList.length}
                />
            </div>
        </div>
    );
};

var styles = {
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

export default InvestingListTable;
