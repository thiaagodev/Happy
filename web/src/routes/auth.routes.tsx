import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/RestrictedAccess/Dashboard';
import DashboardPending from '../pages/RestrictedAccess/DashboardPending';
import ApproveOrphanage from '../pages/RestrictedAccess/ApproveOrphanage';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/pending" component={DashboardPending} />
                <Route path="/approve-orphanage/:id" component={ApproveOrphanage} />
            </Switch>         
        </BrowserRouter>
    );
}

export default Routes;