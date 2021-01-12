import React, { Component } from 'react'
import Home from '../pages/Home'
import NavbarComponent from './NavbarComponent'
import Footer from './Footer'


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
                <Home />
                <Footer />
            </div>
        )
    }
}

export default Main
