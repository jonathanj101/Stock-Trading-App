import React, { Component } from 'react'
import { Route, Switch} from 'react-router-dom'
import Home from '../pages/Home'
import NavbarComponent from './NavbarComponent'
import Footer from './Footer'
import SummaryComponent from '../pages/Summary'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empty: ''
        }
    }
    render() {
        return (
            <div>
                <NavbarComponent />
                <Switch>
                    <Route path="/" exact component={() => <Home />} />
                    <Route path="/summary" exact component={() => <SummaryComponent />} />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default Main
