import React from 'react'
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute(props) {
    return (     // Пытался сделалать через component: Component , но у меня находятся в children 2 компонента (Header и Main)
        <Route>
            {
                props.isLoggedIn ? props.children : <Redirect to="/sign-in"/>
            }
        </Route>
    );
}

export default ProtectedRoute;