import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiEdit3, FiTrash  } from 'react-icons/fi';

import Sidebar from '../../components/SidebarDashboard';
import '../../styles/pages/RestricetdAcess/dashboard.css';
import mapIcon from "../../utils/mapIcon";
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';

interface Orphanage {
  id: number
  latitude: number,
  longitude: number,
  name: string,
}


export default function Dashboard() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const history = useHistory();

    useEffect(() => {
      api.get('/orphanages').then(response => {
        setOrphanages(response.data);
      })
    }, [])

    async function handleDeleteOrphanage(id: number) {
      await api.delete(`/remove/orphanage/${id}`);
      window.location.reload();
    }

    return(     
        <div className="dashboard-page">
            <Sidebar/>
            
            <main className="container">
                <div className="content">
                    <h1>Orfanatos Cadastrados</h1>
                    <legend>{orphanages[0] === null ? 0 : orphanages.length} orfanatos</legend>
                </div>   

                <div className="orphanages">
                  {orphanages[0] !== null && orphanages.map(orphanage => {
                    return (
                      <div className="map-container" key={orphanage.id}>
                        <Map
                          center={[orphanage.latitude, orphanage.longitude]}
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
                          <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                        </Map>

                        <footer>
                          <h2>{orphanage.name}</h2>
                          <div className="buttons">
                            <button type="button" onClick={() => handleDeleteOrphanage(orphanage.id)}>
                              <FiTrash size={24} color="#15C3D6" />
                            </button>
                          </div>
                        </footer>
                      </div> 
                    );
                  })}
                                
                </div>                       
            </main>
        </div>
    );
}