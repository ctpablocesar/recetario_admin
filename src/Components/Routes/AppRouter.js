import React, { useEffect } from 'react'
import {
    HashRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { DashBoardRoutes } from './DashBoardRoutes';
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { LoginScreen } from '../auth/LoginScreen'
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../../actions/auth';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {

        dispatch(startChecking());

    }, [dispatch])

    if (checking) {
        return (<h5>Espere...</h5>);
    }

    return (
        <Router>
            <main>
                <Switch>
                    <PublicRoute
                        path="/"
                        exact
                        isAuthenticated={!!uid}
                        component={LoginScreen}
                    />
                    <PrivateRoute
                        path="/admin"
                        isAuthenticated={!!uid}
                        component={DashBoardRoutes}
                    />
                    <Redirect to="/" />
                </Switch>
            </main>
        </Router>
    )
}