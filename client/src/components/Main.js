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
            errMsg: '',
            email: '',
            isLogged: true,
            isInvestingEmpty: true,
            userStocksData: [],
            investingList: [],
            stocksList: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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
                // debugger;
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
    };

    sendRegistrationFormRequest = (
        firstName,
        lastName,
        password,
        username,
        email,
    ) => {
        // fetch('/submit_form', {
        //     method: 'post',
        //     body: JSON.stringify({
        //         first_name: firstName,
        //         last_name: lastName,
        //         password: password,
        //         username: username,
        //         email: email,
        //     }),
        // })
        //     .then((response) => response.json())
        //     .then((data) => console.log(data));
    };

    handleRegister = (firstName, lastName, password, username, email) => {
        // debugger;
        if (
            firstName === '' ||
            lastName === '' ||
            password === '' ||
            username === '' ||
            email === ''
        ) {
            return;
        }
        this.setState(
            {
                firstName: firstName,
                lasttName: lastName,
                password: password,
                username: username,
                email: email,
            },
            () => console.log(this.state),
        );
        axios
            .post('/submit_registration', {
                first_name: firstName,
                last_name: lastName,
                password: password,
                username: username,
                email: email,
            })
            .then((resp) => {
                debugger;
                console.log(resp);
                // console.log(resp.status);
                // console.log(resp.data);
                // if (resp.status >= 500) {
                //     console.log(resp.data);
                //     this.setState({
                //         errMsg: resp.data,
                //     });
                // }
            })
            .then((err) => console.log(err));
        debugger;

        // fetch('/submit_registration', {
        //     method: 'post',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         first_name: firstName,
        //         last_name: lastName,
        //         password: password,
        //         username: username,
        //         email: email,
        //     }),
        // });
    };

    handleLogIn = () => {
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
                    onSubmit={this.handleLogIn}
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
                                errMsg={this.state.errMsg}
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
