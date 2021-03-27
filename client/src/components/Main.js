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
            isLogged: true,
            isInvestingEmpty: true,
            userStocksData: [],
            investingList: [],
            stocksList: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleTransactions = this.handleTransactions.bind(this);
        this.addStockToInvestingTable = this.addStockToInvestingTable.bind(
            this,
        );
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

    addStockToInvestingTable = (stock) => {
        const newStockInfoInvestingList = {
            symbol: stock.symbol,
            userEstimatedHolding: stock.estimatedUserSharesCost,
            userEstimatedShares:
                stock.estimatedUserSharesCost / stock.stockPrice,
            companyName: stock.companyName,
        };
        if (this.state.investingList.length >= 1) {
            const sameStock = this.state.investingList.find((userStock) => {
                if (userStock.symbol === stock.symbol) return true;
                return false;
            });
            if (sameStock) {
                debugger;
                const totalHolding =
                    sameStock.userEstimatedHolding +
                    stock.estimatedUserSharesCost;
                const totalSharesHolding =
                    sameStock.userEstimatedShares + stock.estimatedUserShares;
                sameStock.userEstimatedHolding =
                    sameStock.userEstimatedHolding +
                    stock.estimatedUserSharesCost;
                sameStock.userEstimatedHolding = totalHolding;
                sameStock.userEstimatedShares = totalSharesHolding;
            } else {
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
        console.log(this.state.investingList);
        console.log(this.state.userStocksData);
    };

    handleChange = (e) => {
        const { value } = e.target;
        console.log(value);
        console.log(value);
        this.setState({
            searchStock: value,
        });
        console.log(this.state);
    };

    handleRegister = (firstName, lastName, password, username) => {
        this.setState(
            {
                firstName: firstName,
                lasttName: lastName,
                password: password,
                username: username,
            },
            () => console.log(this.state),
        );
        console.log(this.state);
        fetch('/submit_form', {
            method: 'post',
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                password: password,
                username: username,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    onSubmit = () => {
        const logInInfo = {
            email: this.state.email,
            password: this.state.password,
        };
        console.log(logInInfo.email);
        this.setState(
            {
                email: logInInfo.email,
                password: logInInfo.password,
            },
            () => {
                console.log(this.state);
            },
        );
        console.log(this.state);
    };

    render() {
        return (
            <div style={{ height: `30vh` }}>
                <NavbarComponent
                    isLogged={this.state.isLogged}
                    handleChange={this.handleChange}
                    onSubmit={this.onSubmit}
                />
                <Switch>
                    <Route path="/" exact component={() => <Home />} />
                    <ProtectRoute
                        path="/my-stocks"
                        exact
                        component={() => (
                            <SummaryComponent
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
                        component={() => (
                            <FormComponent
                                handleRegister={this.handleRegister}
                                onSubmit={this.onSubmit}
                                mainState={this.state}
                            />
                        )}
                    />
                    <Route path="*" component={() => <PageNotFound />} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
