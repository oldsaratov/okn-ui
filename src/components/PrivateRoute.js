import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authService } from '../services/auth.service';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to '/' page
        <Route {...rest} render={props => (
            authService.isLoggedIn() ? <Component {...props} /> : <Redirect to="/"/>
        )}/>
    );
};

export default PrivateRoute;
