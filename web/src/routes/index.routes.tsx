import React, { useContext } from 'react';

import { useAuth } from '../Context/AuthContext';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';


function Routes() {
    const { signed } = useAuth();
    
    return signed ? <AuthRoutes /> : <AppRoutes />;
}

export default Routes;