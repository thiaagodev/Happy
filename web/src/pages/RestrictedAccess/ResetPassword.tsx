import React from 'react';

import '../../styles/pages/reset-password.css';
import Logo from '../../images/Logotipo.svg'
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiEye } from 'react-icons/fi';

export default function ResetPassword() {
    return (
        <div id="login-page">
            <div id="left-side">
                <img src={Logo} alt="Happy"/>
                <div className="location">
                    <strong>Tietê</strong>
                    <span>São Paulo</span>
                </div>
            </div>
            <div id="login-area">
               <h1>Redefinição de senha</h1>
               <p>Escolha uma nova senha para você
                acessar o dashboard do Happy</p>
               <form onSubmit={() => {}} className="login-form">
                    <fieldset>
                        <label htmlFor="email">Seu E-mail</label>
                        <div className="input-block">
                            <input 
                                type="email"
                                id="" 
                                /* value=""  */
                                onChange={() => {}} 
                            />
                        </div>
                        <label htmlFor="password" className="label">Nova senha</label>
                        <div className="input-block">
                            <input 
                                type="password"
                                id="input" 
                                /* value=""  */
                                onChange={() => {}} 
                            />    
                        </div>
                        <label htmlFor="password">Repetir senha</label>  
                        <div className="input-block">
                            <input 
                                type="password"
                                id="" 
                                /* value=""  */
                                onChange={() => {}} 
                            />
                        </div>
                    </fieldset>
                    <button type="button" className="login-button">
                        Enviar
                    </button>
               </form>

               <Link to="/login" className="back">
                    <FiArrowLeft size={26} color="#15C3D6" />
               </Link>
            </div>
        </div>
    );
}