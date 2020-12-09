import React from 'react';
import Button from '../../components/Button';
import GatinhoPetgato from '../../assets/images/gatinho_petgato.svg';

// eslint-disable-next-line no-unused-vars
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
                <Button onClick={() => alert('Cadastrar')} styles="3">CADASTRAR</Button>
            </div>

            <p className="temp">Já possui conta? <a href="a" target="_blank" rel="noreferrer noopener" >Faça login</a></p>

        </div>
    </div>
);

export default Cadastro;