import React from 'react';

import '../../styles/pages/RestricetdAcess/login.css';
import Logo from '../../images/Logotipo.svg'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function Login() {
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
               <h1>Fazer login</h1>
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
                        <label htmlFor="senha">Senha</label>
                        <div className="input-block">
                            <input
                                type="password" 
                                id="" 
                               /*  value=""  */
                                onChange={() => {}} 
                            />
                        </div>
                        <div className="input-block-bottom">
                            <input type="checkbox" id="checkbox"/>
                            <label htmlFor="checkbox">Lembrar-me</label>  

                            <Link id="forgot" to="/forgot-password">Esqueci minha senha</Link>
                        </div>
                    </fieldset>
                    <button type="button" className="login-button">
                        Entrar
                    </button>
               </form>

               <Link to="/" className="back">
                    <FiArrowLeft size={26} color="#15C3D6" />
               </Link>
            </div>
        </div>
    );
}