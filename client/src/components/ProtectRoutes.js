import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectRoute = ({ component: Component, ...rest }) => {
    debugger;
    // const isAuthenticated = false;
    return <Route render={() => <Component {...rest} />} />;
    //     <Component />
    // ) : (
    //     <Redirect to={{ pathname: '/page-not-found' }} />
    // );
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
