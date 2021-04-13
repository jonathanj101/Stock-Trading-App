import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const ProtectRoute = ({ component: Component, ...rest }) => {
    console.log(Component);
    console.log(rest.isLogged);
    const isAuthenticated = false;

    return isAuthenticated ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: '/page-not-found' }} />
    );
};

// class ProtectRoute extends Component {
//     render() {
//         const Component = this.props.component;
//         console.log(this.props);
//         const isAuthenticated = false;
//         return isAuthenticated ? (
//             <Component />
//         ) : (
//             <Redirect to={{ pathname: '/page-not-found' }} />
//         );
//     }
// }

export default ProtectRoute;
