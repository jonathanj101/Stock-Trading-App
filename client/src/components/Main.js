import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Home from '../pages/Home';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import SummaryComponent from '../pages/Summary';
import FormComponent from './User-Auth/Registration/RegisterForm';
import ProtectRoute from './ProtectRoutes';
import PageNotFound from '../pages/PageNotFound';
import SearchComponent from './Search/SearchComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userId: '',
            userHoldings: '',
            isLogged: false,
        };
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    }

    async componentDidMount() {
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        if (localStorageUserId !== null) {
            const response = await axios
                .post('/user', {
                    id: localStorageUserId,
                })
                .then((data) => {
                    return data.data;
                });
            this.setState({
                userId: localStorageUserId,
                username: response.username,
                userHoldings: response.user_holdings,
                isLogged: true,
            });
        } else {
            return;
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        if (this.state.userHoldings !== prevState.userHoldings) {
            const response = await axios
                .post('/user', {
                    id: localStorageUserId,
                })
                .then((data) => {
                    return data.data;
                });
            this.setState({
                id: localStorageUserId,
                username: response.username,
                userHoldings: response.user_holdings,
            });
        }
    }

    isUserAuthenticated = () => {
        const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
        if (localStorageUserId !== null) {
            return true;
        } else {
            return false;
        }
    };

    handleRegister = (userId, username) => {
        if (userId !== undefined) {
            this.setState({
                userId: userId,
                userHoldings: 100000,
                username: username,
                isLogged: true,
            });
        } else {
            return;
        }
    };

    handleLogIn = (userId, username) => {
        if (userId) {
            localStorage.setItem('userId', JSON.stringify(userId));
            this.setState({
                userId: userId,
                username: username,
                isLogged: true,
            });
        }
        return;
    };

    handleLogOut = () => {
        this.setState({
            username: '',
            isLogged: false,
        });
    };

    render() {
        return (
            <div style={{ height: `100%`, width: '100%' }}>
                <NavbarComponent
                    username={this.state.username}
                    userId={this.state.userId}
                    handleLogOut={this.handleLogOut}
                />
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() => (
                            <Home
                                handleLogIn={this.handleLogIn}
                                isLogged={this.state.isLogged}
                            />
                        )}
                    />
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
