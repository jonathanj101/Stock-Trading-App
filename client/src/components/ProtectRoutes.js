import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ProtectRoute extends Component {
    render() {
        const Component = this.props.component;
        const isAuthenticated = true;
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/form' }} />
        );
    }
}

export default ProtectRoute;
