import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRouteAdministratorAndDoctor = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            (sessionStorage.getItem('role') === 'ADMINCC' || sessionStorage.getItem('role') === 'ADMINC' || sessionStorage.getItem('role') === 'DOCTOR') ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRouteAdministratorAndDoctor;