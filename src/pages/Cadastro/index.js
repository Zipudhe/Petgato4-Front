import React from 'react';
import Button from '../../components/Button';
import GatinhoPetgato from '../../assets/images/gatinho_petgato.svg';

import style from './styles.css';

const Cadastro = () => (
    <div>
        <div className="container-img"></div>
        <div className="container-login">

            <img className="logo-petgato" src={GatinhoPetgato} alt="Logo Petgatô" />
            Nome
            <input></input>
            Email
            <input></input>
            Senha
            <input></input>
            Confirme sua senha
            <input></input>
            
            <div className="login-btn">
                <Button onClick={() => alert('Cadastrar')} style={3}>CADASTRAR</Button>
            </div>

            <p className="temp">Já possui conta? <a>Faça login</a></p>

        </div>
    </div>
);

export default Cadastro;