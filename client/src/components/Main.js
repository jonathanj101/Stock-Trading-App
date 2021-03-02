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

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empty: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            city: '',
            state: '',
            zipCode: '',
            testing: true,
            facebook: [],
            tesla: [],
            apple: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
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

    handleRequest = async (request) => {
        console.log(request.data.data);
        try {
            const req = Promise.all(
                request.data.data.map((stock) => {
                    console.log(stock.facebook);
                    return {
                        facebook: stock.facebook,
                    };
                }),
            );
            console.log(req);
            req.then((stockData) => {
                const test = stockData.map((stocking) => {
                    return stocking.facebook;
                });
                console.log(test);
                this.setState(
                    {
                        facebook: stockData,
                    },
                    console.log(this.state.facebook, req),
                );
            });
        } catch (err) {
            console.log(err);
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        console.log({ [name]: value });
        this.setState({
            [name]: value,
        });
        console.log(this.state);
    };

    handleRegister = (
        firstName,
        lastName,
        email,
        password,
        city,
        state,
        zipCode,
    ) => {
        this.setState(
            {
                firstName: firstName,
                lasttName: lastName,
                email: email,
                password: password,
                city: city,
                state: state,
                zipCode: zipCode,
            },
            () => console.log(this.state),
        );
        console.log(this.state);
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
                    isLogged={this.state.testing}
                    handleChange={this.handleChange}
                    onSubmit={this.onSubmit}
                />
                <Switch>
                    <Route path="/" exact component={() => <Home />} />
                    <ProtectRoute
                        path="/my-stocks"
                        exact
                        component={SummaryComponent}
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
