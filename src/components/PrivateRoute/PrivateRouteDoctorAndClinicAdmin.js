import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteDoctor = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            (sessionStorage.getItem('role') === 'DOCTOR' || sessionStorage.getItem('role') === 'ADMINC') ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRouteDoctor;