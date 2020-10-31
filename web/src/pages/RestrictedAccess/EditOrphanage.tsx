import React from 'react';
import { Marker, TileLayer, Map } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import mapIcon from '../../utils/mapIcon';

import '../../styles/pages/RestricetdAcess/edit-orphanage.css'

export default function EditOrphanage() {
    return (
        <div id="page-edit-orphanage"> 
            <Sidebar />

        <main>
            <form onSubmit={() => {}} className="edit-orphanage-form">
                <fieldset>
                    <legend>Dados</legend>

                    <Map 
                      center={[-23.1001758, -47.7136837]} 
                      style={{ width: '100%', height: 280 }}
                      zoom={15}
                      onClick={() => {}}
                    >
                      <TileLayer 
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                      />
                      
                      { 0 !== 0 && (
                        <Marker interactive={false} 
                                icon={mapIcon} 
                                position={[-23.1001758, -47.7136837]} 
                        />)  
                      }
        
                    </Map>

                    <div className="input-block">
                      <label htmlFor="name">Nome</label>
                      <input 
                        id="name" 
                        value={''} 
                        onChange={() => {}} 
                      />
                    </div>

                    <div className="input-block">
                      <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                      <textarea 
                        id="name" 
                        value={''} 
                        onChange={() => {}}
                        maxLength={300} 
                      />
                    </div>

                    <div className="input-block">
                      <label htmlFor="name">Número de Whatsapp</label>
                      <input 
                        id="name" 
                        value={''} 
                        onChange={() => {}} 
                      />
                    </div>

                    <div className="input-block">
                      <label htmlFor="images">Fotos</label>

                      <div className="images-container">
                        {/* {previewImages.map(image => {
                            return (
                              <img key={image} src={image} alt={name}/>
                            );
                        })} */}
                        <label htmlFor="image[]" className="new-image">
                          <FiPlus size={24} color="#15b6d6" />
                        </label>
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
                        value={''} 
                        onChange={() => {}}
                      />
                    </div>

                    <div className="input-block">
                      <label htmlFor="opening_hours">Horário de funcionamento</label>
                      <input 
                        id="opening_hours" 
                        value={''} 
                        onChange={() => {}}  
                      />
                    </div>

                    <div className="input-block">
                      <label htmlFor="open_on_weekends">Atende fim de semana</label>

                      <div className="button-select">
                        <button 
                          type="button" 
                          className={'a'/* open_on_weekends ? 'active': '' */}
                          onClick={() => {}}
                        >
                          Sim
                        </button>

                        <button 
                          type="button"
                          className={'a'/* !open_on_weekends ? 'active': '' */}
                          onClick={() => {}}
                        >
                          Não
                        </button>
                      </div>
                    </div>
                </fieldset>

                <button className="confirm-edit-button" type="submit">
                    Confirmar
                </button>
            </form>
        </main>
        </div>
    );
}