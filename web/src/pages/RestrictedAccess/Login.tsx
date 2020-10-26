import React from 'react';

import '../../styles/pages/login.css';
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
                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                id="" 
                                /* value=""  */
                                onChange={() => {}} 
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="senha">Senha</label>
                            <input 
                                id="" 
                               /*  value=""  */
                                onChange={() => {}} 
                            />
                        </div>
                        <div className="input-block-bottom">
                            <input type="checkbox" name="" id="checkbox"/>
                            <label htmlFor="senha">Lembrar-me</label>  

                            <p id="forgot">Esqueci minha senha</p>
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