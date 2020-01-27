import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRouteAdmin = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            sessionStorage.getItem('role') === 'ADMINCC' ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRouteAdmin;