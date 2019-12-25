import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteLogged = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            sessionStorage.getItem('token') !== null ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRouteLogged;