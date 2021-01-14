import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import Input from '../../components/Input';
import logo_petgato from '../../assets/images/gatinho_petgato.svg';

import './styles.css';

export default function Cadastro(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    function changeName(name) {
        setName(name);
    }

    function changeEmail(email) {
        setEmail(email);
    }

    function changePassword(password) {
        setPassword(password);
    }

    function changePasswordConfirmation(passwordConfirmation) {
        setPasswordConfirmation(passwordConfirmation);
    }

    const cadastrar = async () => {
        // faz algo pra indicar pro usuário que foi (limpar inputs errados, etc)

        axios.post(`http://localhost:3000/users/`, {
            "user": {
                name: name,
                password: password,
                password_confirmation: passwordConfirmation,
                email: email
            }})
            .catch((error) => console.error(error)); // colocar um erro de pop up
        
            // redireciona para página inicial logado já

    }

    return (
        <div className="container-cadastro">
            <div className="container-img"></div>
            <div className="content-cadastro">

                <Link to="/"><img className="logo-petgato" src={logo_petgato} alt="Logo Petgatô" /></Link>
                <div className="container-input">
                    <Input name="Nome" handleValue={changeName} />
                    <Input name="Email" handleValue={changeEmail} />
                    <Input name="Senha" password={true} handleValue={changePassword} />
                    <Input name="Confirme sua senha" password={true} handleValue={changePasswordConfirmation} />
                </div>

                <Button onClick={() => cadastrar()} styles="3">CADASTRAR</Button>

                <p>Já possui conta? <Link to="/login">Faça login</Link></p>
            </div>
        </div>
    );
}
