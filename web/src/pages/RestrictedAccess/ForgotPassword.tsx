import React from 'react';

import '../../styles/pages/forgot-password.css';
import Logo from '../../images/Logotipo.svg'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function ForgotPassword() {
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
               <h1>Esqueci a senha</h1>
               <p>Sua redefinição de senha será enviada
                para o e-mail cadastrado.</p>
               <form onSubmit={() => {}} className="login-form">
                    <fieldset>
                        <label htmlFor="email">E-mail</label>
                        <div className="input-block">
                            <input 
                                type="email"
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