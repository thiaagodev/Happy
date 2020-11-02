import React, { useEffect, useState } from 'react';
import { Marker, TileLayer, Map } from 'react-leaflet';
import { FiPlus, FiXCircle,  FiCheck, FiInfo} from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import mapIcon from '../../utils/mapIcon';

import '../../styles/pages/RestricetdAcess/approve-orphanage.css'
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';

interface Orphanage {
  latitude: number,
  longitude: number,
  name: string,
  about: string,
  whatsapp_number: string,
  instructions: string,
  opening_hours: string,
  open_on_weekends: string,
  images: Array<{
    id: number;
    url: string
  }>
}

interface OrphanageParams {
    id: string;
}

export default function ApproveOrphanage() {
    const history = useHistory();
    const params = useParams<OrphanageParams>();
    const [orphanage, setOrphanage] = useState<Orphanage>();

    useEffect(() => {
        api.get(`/pending-orphanages-details/${params.id}`).then(response => {
          setOrphanage(response.data);
        });
    }, [params.id]);
    
    if (!orphanage) {
        return <p>Carregando...</p>
    }

    async function handleRecuseOrphanage() {
        await api.delete(`/remove/orphanage/${params.id}`);
        
        history.push('/pending');
    }   
    
    async function handleApproveOrphanage() {
        await api.put(`/approve/orphanage/${params.id}`);
        history.push('/');
    }   

    return (
        <div id="page-approve-orphanage"> 
            <Sidebar />

        <main>
            <form onSubmit={() => {}} className="aprove-orphanage-form">
                <fieldset>
                    <legend>Dados</legend>

                    <Map 
                      center={[orphanage.latitude, orphanage.longitude]} 
                      style={{ width: '100%', height: 280 }}
                      zoom={15}
                      onClick={() => {}}
                    >
                      <TileLayer 
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                      />
                      
                      { orphanage.latitude !== 0 && (
                        <Marker interactive={false} 
                                icon={mapIcon} 
                                position={[orphanage.latitude, orphanage.longitude]} 
                        />)  
                      }
        
                    </Map>

                    <div className="input-block">
                      <label htmlFor="name">Nome</label>
                      <input 
                        id="name" 
                        value={orphanage.name} 
                        onChange={() => {}} 
                      />
                    </div>

                    <div className="input-block">
                      <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                      <textarea 
                        id="name" 
                        value={orphanage.about} 
                        onChange={() => {}}
                        maxLength={300} 
                      />
                    </div>

                    <div className="input-block">
                      <label htmlFor="name">Número de Whatsapp</label>
                      <input 
                        id="name" 
                        value={orphanage.whatsapp_number} 
                        onChange={() => {}} 
                      />
                    </div>

                    <div className="input-block">
                      <label htmlFor="images">Fotos</label>

                      <div className="images-container">
                        {orphanage.images.map(image => {
                            return (
                              <img key={image.id} src={image.url} alt={image.url}/>
                            );
                        })}
                      </div>
                    
                      <input multiple onChange={() => {}} type="file" id="image[]"/>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Visitação</legend>

                    <div className="input-block">
                      <label htmlFor="instructions">Instruções</label>
                      <textarea 
                        id="instructions" 
                        value={orphanage.instructions} 
                        onChange={() => {}}
                      />
                    </div>

                    <div className="input-block">
                      <label htmlFor="opening_hours">Horário de funcionamento</label>
                      <input 
                        id="opening_hours" 
                        value={orphanage.opening_hours} 
                        onChange={() => {}}  
                      />
                    </div>

                    <div className="input-block">
                      <label htmlFor="open_on_weekends">Atende fim de semana</label>                  
                        <div className="open-details">
                                {orphanage.open_on_weekends ? (
                                    <div className="open-on-weekends">
                                    <FiInfo size={32} color="#39CC83" />
                                        Atendemos <br />
                                    f   im de semana
                                    </div>
                                ) : (
                                    <div className="open-on-weekends dont-open">
                                        <FiInfo size={32} color="#FF669D" />
                                            Não atendemos <br />
                                            fim de semana
                                    </div>
                                )}                         
                        </div>
                    </div>
                </fieldset>
                
                <div className="approved-or-not">
                    <button type="button" className="recuse-button" onClick={handleRecuseOrphanage}>
                        <FiXCircle />
                        Recusar
                    </button>
                    <button type="button" className="approve-button" onClick={handleApproveOrphanage}>
                        <FiCheck />
                        Aceitar
                    </button>
                </div>

            </form>
        </main>
        </div>
    );
}