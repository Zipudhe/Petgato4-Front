import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import logo_petgato from '../../assets/images/gatinho_petgato.svg';

import './styles.css';

export default function Login(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    

    return(
        <div className="container-login">
            <div className="container-img"></div>
            <div className="content-login">

                <Link to="/"><img className="logo-petgato" src={logo_petgato} alt="Logo Petgatô" /></Link>
                <div className="container-input">
                    <Input name="Email" />
                    <Input name="Senha" password={true} />
                </div>

                <Button onClick={() => alert('ENTRAR')} styles="3">ENTRAR</Button>

                <div className="container-text">
                    <Link to="/recuperar-senha"><a>Esqueci minha senha</a></Link>
                    <p>Ainda não tem conta? <Link to="/cadastro"><a>Crie sua conta</a></Link></p>
                </div>
            </div>
        </div>
    );
}