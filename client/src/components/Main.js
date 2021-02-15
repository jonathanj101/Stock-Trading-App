import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import SummaryComponent from '../pages/Summary';
import FormComponent from './Form';
import ProtectRoute from './ProtectRoutes';
import PageNotFound from '../pages/PageNotFound';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empty: '',
            email: '',
            password: '',
            testing: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // componentDidMount() {
    //     fetch('/testing_data')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         });
    // }
    handleChange = (e) => {
        const { name, value } = e.target;
        // console.log({ [name]: value });
        this.setState({
            [name]: value,
        });
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
                        path="/form"
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
