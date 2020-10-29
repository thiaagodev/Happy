import React from 'react';
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiArrowRight } from 'react-icons/fi';

import Sidebar from '../../components/SidebarDashboardPending';
import '../../styles/pages/RestricetdAcess/dashboard-pending.css';
import mapIcon from "../../utils/mapIcon";

export default function DashboardPending() {
    return(     
        <div className="dashboard-pending-page">
            <Sidebar/>
            
            <main className="container">
                <div className="content">
                    <h1>Orfanatos Pendentes</h1>
                    <legend>1 orfanatos</legend>
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
                          <h2>Orfanato tal tal</h2>
                            <button type="button" onClick={() => {}}>
                              <FiArrowRight size={24} color="#15C3D6" />
                            </button>
                        </footer>
                    </div>            
                </div>                       
            </main>
        </div>
    );
}