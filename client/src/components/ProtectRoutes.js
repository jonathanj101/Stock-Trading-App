import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ProtectRoute extends Component {
    render() {
        const Component = this.props.component;
        console.log(Component);
        const isAuthenticated = false;
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/form' }} />
        );
    }
}

export default ProtectRoute;
