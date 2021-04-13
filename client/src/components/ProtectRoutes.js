import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectRoute = ({ component: Component, ...rest }) => {
    debugger;
    console.log(Component);
    console.log({ ...rest });
    // console.log(isLogged);
    const isAuthenticated = false;
    return (
        <Route
            render={() =>
                isAuthenticated ? (
                    <Component />
                ) : (
                    <Redirect to={{ pathname: '/page-not-found' }} />
                )
            }
        />
    );
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
