import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectRoute = ({ component: Component, ...rest }) => {
    // debugger;
    const isAuthenticated = true;
    return isAuthenticated ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: '/page-not-found' }} />
    );
};

export default ProtectRoute;
