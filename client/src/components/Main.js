import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import SummaryComponent from '../pages/Summary';
import FormComponent from './Form';
import ProtectRoute from './ProtectRoutes';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empty: '',
            testing: false,
        };
    }

    // componentDidMount() {
    //     fetch('/testing_data')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         });
    // }

    render() {
        return (
            <div style={{ height: `30vh` }}>
                <NavbarComponent isLogged={this.state.testing} />
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
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
