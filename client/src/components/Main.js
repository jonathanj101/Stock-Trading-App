import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
            firstName: '',
            lastName: '',
            password: '',
            username: '',
            userId: '',
            email: '',
            isLogged: false,
            userStocksData: [],
        };
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleTransactions = this.handleTransactions.bind(this);
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    }

    // async componentDidMount() {
    //     let multipleStocksData = await axios.get('/multiple');
    //     this.handleRequest(multipleStocksData);
    // }

    // async componentDidUpdate(prevProps, prevState) {
    //     const isLogged = this.state.isLogged;
    //     this.isUserAuthenticated(isLogged);
    //     console.log(isLogged);
    //     debugger;
    //     // if (this.state.isLogged !== prevState.isLogged) {
    //     //     this.isUserAuthenticated(isLogged);
    //     // }
    // }

    // handleRequest = async (request) => {
    //     try {
    //         const req = Promise.all(
    //             request.data.data.map((stock) => {
    //                 return {
    //                     stockData: stock,
    //                 };
    //             }),
    //         );
    //         req.then((stockData) => {
    //             this.setState({
    //                 stocksList: stockData,
    //             });
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

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

    isUserAuthenticated = (user) => {
        // debugger;
        console.log(user);
        if (user) {
            console.log(true);
            return true;
        } else {
            console.log(false);
            return false;
        }
    };

    handleLogIn = (userId, username) => {
        debugger;
        this.setState({
            userId: userId,
            username: username,
            isLogged: true,
        });
        this.isUserAuthenticated(true);
    };

    render() {
        const isAunthenticated = this.isUserAuthenticated();
        console.log(isAunthenticated);
        return (
            <div style={{ height: `30vh` }}>
                <NavbarComponent
                    isLogged={this.state.isLogged}
                    handleLogIn={this.handleLogIn}
                />
                <Switch>
                    <Route path="/" exact render={() => <Home />} />
                    <ProtectRoute
                        path="/my-stocks"
                        exact
                        component={() => <SummaryComponent />}
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
