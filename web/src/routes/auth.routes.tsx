import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/RestrictedAccess/Dashboard';
import DashboardPending from '../pages/RestrictedAccess/DashboardPending';
import EditOrphanage from '../pages/RestrictedAccess/EditOrphanage';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/pending" component={DashboardPending} />
                <Route path="/edit-orphanage" component={EditOrphanage} />
            </Switch>         
        </BrowserRouter>
    );
}

export default Routes;