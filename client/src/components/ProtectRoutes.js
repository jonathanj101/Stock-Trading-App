import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectRoute = ({ component: Component, isUserAuthenticated }) => {
    debugger;
    // console.log(Component);
    console.log(isUserAuthenticated);
    return isUserAuthenticated ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: '/page-not-found' }} />
    );
};

export default ProtectRoute;
