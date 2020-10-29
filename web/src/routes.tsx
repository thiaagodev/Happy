import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import Login from './pages/RestrictedAccess/Login';
import ForgotPassword from './pages/RestrictedAccess/ForgotPassword';
import ResetPassword from './pages/RestrictedAccess/ResetPassword';
import Dashboard from './pages/RestrictedAccess/Dashboard';
import DashboardPending from './pages/RestrictedAccess/DashboardPending';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/app" component={OrphanagesMap} />

                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/dashboard-pending" component={DashboardPending} />
            </Switch>         
        </BrowserRouter>
    );
}

export default Routes;