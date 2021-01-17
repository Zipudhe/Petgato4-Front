import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import Input from '../../components/Input';
import logo_petgato from '../../assets/images/gatinho_petgato.svg';

import './styles.css';

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
    const userLogin = () => {
        axios.post(`http://localhost:3000/auth/login`, {
        "email": email,
        "password": password
        }).then((response) => {
            localStorage.setItem('current_user', response.data.user_id);
            localStorage.setItem('token', response.data.token);
            
            console.log(response.data.user_id);
        })
        .catch((error) => console.error(error)); // colocar um erro de pop up
    }

    function changeEmail(email) {
        setEmail(email);
    }

    function changePassword(password) {
        setPassword(password);
    }

    return(
        <div className="container-login">
            <div className="container-img"></div>
            <div className="content-login">
                <Link to="/"><img className="logo-petgato" src={logo_petgato} alt="Logo Petgatô" /></Link>
                <div className="container-input">
                    <Input name="Email" handleValue={changeEmail} />
                    <Input name="Senha" handleValue={changePassword} password={true} />
                </div>

                <Button onClick={userLogin} styles="3">ENTRAR</Button>

                <div className="container-text">
                    <Link to="/recuperar-senha">Esqueci minha senha</Link>
                    <p>Ainda não tem conta? <Link to="/cadastro">Crie sua conta</Link></p>
                </div>
            </div>
        </div>
    );
}