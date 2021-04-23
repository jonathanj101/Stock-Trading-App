import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import SummaryComponent from '../pages/Summary';
import FormComponent from './RegisterForm';
import ProtectRoute from './ProtectRoutes';
import PageNotFound from '../pages/PageNotFound';
import SearchComponent from './SearchComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userId: '',
            email: '',
            userStocksData: [],
        };
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleTransactions = this.handleTransactions.bind(this);
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    }

    componentDidMount() {
        debugger;
        this.isUserAuthenticated();
    }

    // componentDidUpdate(prevProps, prevState) {
    //     const userId= this.state.isLogged;
    //     this.isUserAuthenticated(isLogged);
    //     console.log(isLogged);
    //     debugger;
    //     // if (this.state.isLogged !== prevState.isLogged) {
    //     //     this.isUserAuthenticated(isLogged);
    //     // }
    // }

    handleTransactions = (stockInfo) => {
        console.log(stockInfo);
    };

    isUserAuthenticated = () => {
        debugger;
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        if (localStorageUserId === this.state.userId) {
            console.log(true);
            return true;
        } else {
            console.log(false);
            return false;
        }
    };

    handleRegister = (userId) => {
        debugger;
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));

        if (localStorageUserId !== null) {
            this.setState({
                userId: localStorageUserId,
            });
        } else if (userId !== undefined) {
            this.setState({
                userId: userId,
            });
        } else {
            return;
        }
    };

    handleLogIn = (userId) => {
        debugger;
        if (userId) {
            localStorage.setItem('userId', JSON.stringify(userId));
            this.setState({
                userId: userId,
            });
        }
        return;
    };

    render() {
        return (
            <div style={{ height: `30vh` }}>
                <NavbarComponent handleLogIn={this.handleLogIn} />
                <Switch>
                    <Route path="/" exact render={() => <Home />} />
                    <ProtectRoute
                        path="/my-stocks"
                        exact
                        isUserAuthenticated={this.isUserAuthenticated()}
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
                        component={() => (
                            <FormComponent
                                handleRegister={this.handleRegister}
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
