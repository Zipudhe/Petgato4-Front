import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SpanText from '../../components/SpanText';
import GatinhoPetgato from '../../assets/images/gatinho_petgato.svg';

// eslint-disable-next-line no-unused-vars
import style from './styles.css';

const Cadastro = () => (
    <div>
        <div className="container-img"></div>
        <div className="container-login">

            <img className="logo-petgato" src={GatinhoPetgato} alt="Logo Petgatô" />
            <Input name="Nome"/>
            <Input name="Email"/>
            <Input name="Senha"/>
            <Input name="Confirme sua senha"/>
            
            <div className="login-btn">
                <Button onClick={() => alert('Cadastrar')} styles="3">CADASTRAR</Button>
            </div>

            <SpanText text="Já possui conta?" link="Faça login" path="/login"/>

        </div>
    </div>
);

export default Cadastro;