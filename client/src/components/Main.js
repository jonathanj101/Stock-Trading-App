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
            microsoft: [],
            american_airline: [],
            qcom: [],
            sony: [],
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
        try {
            const req = Promise.all(
                request.data.data.map((stock) => {
                    console.log(stock);
                    return {
                        apple: stock.apple,
                        facebook: stock.facebook,
                        tesla: stock.tesla,
                        microsoft: stock.microsoft,
                        american_airline: stock.american_airline,
                        qcom: stock.qcom,
                        sony: stock.sony,
                    };
                }),
            );
            console.log(req);
            req.then((stockData) => {
                this.setState({
                    apple: stockData[0].apple,
                    facebook: stockData[0].facebook,
                    tesla: stockData[0].tesla,
                    american_airline: stockData[0].american_airline,
                    microsoft: stockData[0].microsoft,
                    sony: stockData[0].sony,
                    qcom: stockData[0].qcom,
                });
                console.log(this.state);
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
                        component={() => (
                            <SummaryComponent
                                apple={this.state.apple}
                                facebook={this.state.facebook}
                                tesla={this.state.tesla}
                                american_airline={this.state.american_airline}
                                microsoft={this.state.microsoft}
                                sony={this.state.sony}
                                qcom={this.state.qcom}
                            />
                        )}
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
