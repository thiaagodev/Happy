import React from 'react';
import { Map, Marker, TileLayer } from "react-leaflet";

import Sidebar from '../../components/SidebarDashboard';
import '../../styles/pages/RestricetdAcess/dashboard.css';
import mapIcon from "../../utils/mapIcon";

export default function Dashboard() {
    return(     
        <div className="dashboard-page">
            <Sidebar/>
            
            <main className="container">
                <div className="content">
                    <h1>Orfanatos Cadastrados</h1>
                    <legend>2 orfanatos</legend>
                </div>   

                <div className="orphanages">
                     <div className="map-container">
                        <Map
                          center={[-23.3570304, -47.8347264]}
                          zoom={16}
                          style={{ width: '100%', height: 280 }}
                          dragging={false}
                          touchZoom={false}
                          zoomControl={false}
                          scrollWheelZoom={false}
                          doubleClickZoom={false}
                        >
                          <TileLayer
                            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                          />
                          <Marker interactive={false} icon={mapIcon} position={[-23.3570304, -47.8347264]} />
                        </Map>

                        <footer>
                          <a  target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${23.5887},${47.5658}`}>Ver rotas no Google Maps</a>
                        </footer>
                    </div>
                    
                </div>
                          
            </main>
        </div>
    );
}