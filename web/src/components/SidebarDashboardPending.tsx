import React, { useContext } from 'react';
import { FiPower, FiMapPin, FiAlertCircle } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar-pending-dashboard.css'

export default function Sidebar() {
    const history = useHistory();

    const { signOut } = useAuth();

    function handleSignOut() {
        signOut();
        history.push('/');
    }
    return (
        <aside className="dashboard-pending-sidebar">
            <img src={mapMarkerImg} alt="Happy" />
            <main>
                <Link to="/">
                <button className="map-pin" type="button">
                    <FiMapPin size={24} color="#FFF" />
                </button>
                </Link>
                
                <Link to="/pending">
                    <button className="alert-circle" type="button">
                        <FiAlertCircle size={24} color="#0089A5" />
                    </button>
                </Link>
                
            </main>
            <footer>
                <button type="button" onClick={handleSignOut}>
                    <FiPower size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    );
}