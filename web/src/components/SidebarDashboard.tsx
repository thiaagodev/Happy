import React from 'react';
import { FiPower, FiMapPin, FiAlertCircle } from 'react-icons/fi'
import { useHistory } from 'react-router-dom';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar-dashboard.css'

export default function Sidebar() {
    const { goBack } = useHistory();
    return (
        <aside className="dashboard-sidebar">
            <img src={mapMarkerImg} alt="Happy" />
            <main>
                <button className="map-pin" type="button" onClick={goBack}>
                    <FiMapPin size={24} color="#0089A5" />
                </button>
                <button className="alert-circle" type="button" onClick={goBack}>
                    <FiAlertCircle size={24} color="#FFF" />
                </button>
            </main>
            <footer>
                <button type="button" onClick={goBack}>
                    <FiPower size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    );
}