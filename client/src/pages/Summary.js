import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComponent from '../components/Search/SearchComponent';
import BuyStockModal from '../components/Buy-Sell-Stocks/Buy-Stock/BuyStockModal';
import SellStockModal from '../components/Buy-Sell-Stocks/Sell-Stock/SellStockModal';
import StockListTableComponent from '../components/Stocks-Table/StockListTableComponent';
import InvestingListTable from '../components/Stocks-Table/InvestingListTable';
import PaginationComponent from '../components/Pagination/PaginationComponent';

const SummaryComponent = () => {
    const [showBuyStockModal, setBuyStockModal] = useState(false);
    const [showSellStockModal, setSellStockModal] = useState(false);
    const [estimatedShares, setEstimatedShares] = useState('0.00');
    const [estimatedCost, setEstimatedCost] = useState('$0.00');
    const [stockInputValue, setStockInputValue] = useState('0.00');
    const [stockName, setStockName] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [userBuyingPower, setUserBuyingPower] = useState('');
    const [isStockQuantity, setIsStockQuantity] = useState(true);
    const [investingList, setInvestingList] = useState([]);
    const [differenceInCost, setDifferenceInCost] = useState('');
    const [isInvesting, setIsInvesting] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [stocksPerPage] = useState(4);

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

    const handleShowBuyStockModal = () => {
        setBuyStockModal(true);
        setEstimatedShares('0.00');
        setEstimatedCost('$0.00');
    };

    const handleShowSellStockModal = () => {
        setSellStockModal(true);
    };

    const getStockFromSearchAddToModal = (e) => {
        setStockName(e.stockName);
        setStockSymbol(e.stockSymbol);
        setStockPrice(e.stockPrice);
    };

    const isSameStock = (stock) => {
        const sameStock = investingList.find(
            (userStock) => userStock.symbol === stock.symbol,
        );
        if (sameStock) {
            const totalHolding =
                sameStock.userEstimatedHolding + stock.estimatedUserSharesCost;

            const totalSharesHolding =
                sameStock.userEstimatedShares + stock.estimatedUserShares;

            sameStock.userEstimatedHolding =
                sameStock.userEstimatedHolding + stock.estimatedUserSharesCost;

            sameStock.userEstimatedHolding = totalHolding;
            sameStock.userEstimatedShares = totalSharesHolding;
            return sameStock;
        } else {
            return undefined;
        }
    };

    const addStock = () => {
        setIsInvesting(true);
        addToInvesting({
            companyName: stockName,
            symbol: stockSymbol,
            estimatedUserSharesCost: estimatedCost,
            estimatedUserShares: estimatedShares,
            stockPrice: stockPrice.includes('.')
                ? parseFloat(stockPrice.slice(1))
                : parseInt(stockPrice.slice(1)),
        });
    };

    const addStockToInvestingTable = (stock) => {

        setEstimatedCost(stock.estimatedUserSharesCost);
        setEstimatedShares(stock.estimatedUserSharesCost / stock.stockPrice);
        const newStockInfoInvestingList = {
            symbol: stock.symbol,
            stockPrice: stock.stockPrice,
            userEstimatedHolding: stock.estimatedUserSharesCost,
            userEstimatedShares:
                stock.estimatedUserSharesCost / stock.stockPrice,
            companyName: stock.companyName,
        };
        if (investingList.length >= 1) {
            if (isSameStock(stock) === undefined) {
                setInvestingList([...investingList, newStockInfoInvestingList]);
                setStocks([...stocks, newStockInfoInvestingList]);
            }
        } else {
            setInvestingList([...investingList, newStockInfoInvestingList]);
            setStocks([...stocks, newStockInfoInvestingList]);
        }
    };


        addStockToInvestingTable(stockInfo);
    };

    const handleUserStockInput = (e) => {
        const { value } = e.currentTarget;
        setStockInputValue(value);
    };

    const calculateOnTitleChange = () => {
        const parseStockInputValue = parseFloat(stockInputValue);
        const parseSliceStockCost = stockPrice.includes('.')
            ? parseFloat(stockPrice.slice(1))
            : parseInt(stockPrice.slice(1));

        if (!isStockQuantity) {
            const totalShares = parseStockInputValue / parseSliceStockCost;
            if (!isNaN(totalShares)) {
                setEstimatedShares(totalShares);
                return setEstimatedShares(totalShares);
            } else {
                setEstimatedShares('0.00');
                return setEstimatedShares('0.00');
            }
        } else {
            const totalCost = parseSliceStockCost * parseStockInputValue;
            if (!isNaN(totalCost)) {
                setEstimatedCost(totalCost);
                return setEstimatedCost(totalCost);
            } else {
                setEstimatedCost('$0.00');
                return setEstimatedCost('$0.00');
            }
        }
    };

    const calculateCost = (stockInput) => {
        const { value } = stockInput.currentTarget;
        let parseStockInput = parseFloat(value);
        const parseSliceStockCost = stockPrice.includes('.')
            ? parseFloat(stockPrice.slice(1))
            : parseInt(stockPrice.slice(1));
        if (isStockQuantity) {
            const totalShares = parseStockInput / parseSliceStockCost;
            if (!isNaN(totalShares)) {
                setEstimatedShares(totalShares);
                setEstimatedCost(parseStockInput);
            } else {
                return;
            }
        } else {
            const totalCost = parseSliceStockCost * parseStockInput;
            if (!isNaN(totalCost)) {
                setEstimatedCost(totalCost);
                setEstimatedShares(parseStockInput);
            } else {
                return;
            }
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastStock = currentPage * stocksPerPage;
    const indexOfFirstStock = indexOfLastStock - stocksPerPage;
    const currentStocks = investingList.slice(
        indexOfFirstStock,
        indexOfLastStock,
    );

    return (
        <div id="summary-page">
            <SearchComponent
                addStockToInvestingTable={addStockToInvestingTable}
                handleShow={handleShowBuyStockModal}
                getStockFromSearchAddToModal={getStockFromSearchAddToModal}
                showBuyStockModal={showBuyStockModal}
            />

            <BuyStockModal
                showBuyStockModal={showBuyStockModal}
                stockName={stockName}
                stockSymbol={stockSymbol}
                stockPrice={stockPrice}
                isStockQuantity={isStockQuantity}
                setIsStockQuantity={setIsStockQuantity}
                addStock={addStock}
                calculateOnTitleChange={calculateOnTitleChange}
                calculateCost={calculateCost}
                estimatedCost={estimatedCost}
                estimatedShares={estimatedShares}
                handleUserStockInput={handleUserStockInput}
                setStockInputValue={setStockInputValue}
                setEstimatedCost={setEstimatedCost}
                setEstimatedShares={setEstimatedShares}
                setShow={setBuyStockModal}
                userHoldings={userBuyingPower}
                stockInputValue={parseFloat(stockInputValue)}
            />

            <SellStockModal
                showSellStockModal={showSellStockModal}
                setSellStockModal={setSellStockModal}
                stockName={stockName}
                stockSymbol={stockSymbol}
                estimatedCost={estimatedCost}
                estimatedShares={estimatedShares}
                differenceInCost={differenceInCost}
                userHoldings={userBuyingPower}
                setCounter={setIsInvesting}
            />
            <InvestingListTable
                setStockName={setStockName}
                setStockSymbol={setStockSymbol}
                setEstimatedCost={setEstimatedCost}
                setEstimatedShares={setEstimatedShares}
                setDifferenceInCost={setDifferenceInCost}
                setUserBuyingPower={setUserBuyingPower}
                handleShowSellStockModal={handleShowSellStockModal}
                isInvesting={isInvesting}
                setIsInvesting={setIsInvesting}
                currentStocks={currentStocks}
            />
            <div>
                <PaginationComponent
                    investingListLength={investingList.length}
                    handlePageChange={handlePageChange}
                    stocksPerPage={stocksPerPage}
                />
            </div>
            <div className="w-100" style={{ marginBottom: '55px' }}>
                <StockListTableComponent
                    handleShowBuyStockModal={handleShowBuyStockModal}
                    setStockName={setStockName}
                    setStockPrice={setStockPrice}
                    setStockSymbol={setStockSymbol}
                />
            </div>
        </div>
    );
};

export default SummaryComponent;
