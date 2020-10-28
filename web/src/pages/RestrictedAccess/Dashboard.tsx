import React from 'react';

import Sidebar from '../../components/SidebarDashboard';
import '../../styles/pages/RestricetdAcess/dashboard.css';

export default function Dashboard() {
    return(     
        <div className="dashboard-page">
            <Sidebar/>
        </div>
    );
}