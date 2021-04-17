import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectRoute = ({ component: Component, isUserAuthenticated }) => {
    return isUserAuthenticated ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: '/page-not-found' }} />
    );
};

export default ProtectRoute;
