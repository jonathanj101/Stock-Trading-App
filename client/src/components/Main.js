import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Home from '../pages/Home';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import SummaryComponent from '../pages/Summary';
import FormComponent from './RegisterForm';
import ProtectRoute from './ProtectRoutes';
import PageNotFound from '../pages/PageNotFound';
import SearchComponent from '../pages/SearchComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchStock: '',
            firstName: '',
            lastName: '',
            password: '',
            username: '',
            userID: '',
            email: '',
            isLogged: false,
            isInvestingEmpty: true,
            userStocksData: [],
            investingList: [],
            stocksList: [],
        };
        this.handleRequest = this.handleRequest.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleTransactions = this.handleTransactions.bind(this);
        this.addStockToInvestingTable = this.addStockToInvestingTable.bind(
            this,
        );
        this.isSameStock = this.isSameStock.bind(this);
    }

    async componentDidMount() {
        // fetch(`/testing`)
        //     .then((response) => {
        //         response.json();
        //     })
        //     .then((data) => console.log(data));
        // fetch('/testing_data')
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);
        //     });
        let multipleStocksData = await axios.get('/multiple');
        this.handleRequest(multipleStocksData);
        // fetch('/multiple')
        //     .then((resp) => resp.json())
        //     .then((data) => {
        //         console.log(data);
        //     });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.searchStock !== prevState.userSearchStock) {
            console.log(prevState, this.state.searchStock);
        }
    }

    isSameStock = (stock) => {
        const sameStock = this.state.investingList.find(
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

    addStockToInvestingTable = (stock) => {
        const newStockInfoInvestingList = {
            symbol: stock.symbol,
            userEstimatedHolding: stock.estimatedUserSharesCost,
            userEstimatedShares:
                stock.estimatedUserSharesCost / stock.stockPrice,
            companyName: stock.companyName,
        };
        if (this.state.investingList.length >= 1) {
            if (this.isSameStock(stock) === undefined) {
                this.setState({
                    investingList: [
                        ...this.state.investingList,
                        newStockInfoInvestingList,
                    ],
                });
            }
        } else {
            this.setState({
                investingList: [
                    ...this.state.investingList,
                    newStockInfoInvestingList,
                ],
            });
        }
    };

    handleRequest = async (request) => {
        // console.log(request.data);
        try {
            const req = Promise.all(
                request.data.data.map((stock) => {
                    return {
                        stockData: stock,
                    };
                }),
            );
            // console.log(req);
            req.then((stockData) => {
                this.setState({
                    stocksList: stockData,
                });
                // console.log(this.state);
            });
        } catch (err) {
            console.log(err);
        }
    };

    handleTransactions = (stockInfo) => {
        console.log(stockInfo);
    };

    sendRegistrationFormRequest = (
        firstName,
        lastName,
        password,
        username,
        email,
    ) => {
        return;
    };

    handleLogIn = (e) => {
        // debugger;
        console.log(e);
        // const logInInfo = {
        //     email: this.state.email,
        //     password: this.state.password,
        // };
        // console.log(logInInfo.email);
        // this.setState(
        //     {
        //         email: logInInfo.email,
        //         password: logInInfo.password,
        //     },
        //     () => {
        //         console.log(this.state);
        //     },
        // );
        // console.log(this.state);
    };

    render() {
        return (
            <div style={{ height: `30vh` }}>
                <NavbarComponent
                    isLogged={this.state.isLogged}
                    onSubmit={this.handleLogIn}
                />
                <Switch>
                    <Route path="/" exact render={() => <Home />} />
                    <ProtectRoute
                        path="/my-stocks"
                        exact
                        component={() => (
                            <SummaryComponent
                                isLogged={this.state.isLogged}
                                investingList={this.state.investingList}
                                stocksList={this.state.stocksList}
                                handleTransactions={this.handleTransactions}
                                handleRequest={this.handleRequest}
                                mainState={this.state}
                                addStockToInvestingTable={
                                    this.addStockToInvestingTable
                                }
                            />
                        )}
                    />
                    <ProtectRoute
                        path="/my-stocks"
                        exact
                        component={() => <SearchComponent />}
                    />
                    <Route
                        path="/register"
                        exact
                        component={() => <FormComponent />}
                    />
                    <Route path="*" component={() => <PageNotFound />} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
