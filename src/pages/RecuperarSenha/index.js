import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import logo_petgato from '../../assets/images/gatinho_petgato.svg';

import './styles.css';

const RecuperarSenha = () => (
    <div className="container-recover">
        <div className="container-img"></div>
        <div className="content-login">

            <Link to="/"><img className="logo-petgato" src={logo_petgato} alt="Logo Petgatô" /></Link>
            <div className="container-input">
                <Input name="Email"/>
                <p>Insira seu email para recuperar a senha</p>
            </div>

            <Button onClick={() => alert('Desculpe, essa função está indisponível no momento.')} styles="3">RECUPERAR SENHA</Button>

            <div className="container-text">
                <p>Lembrou a senha? <Link to="/login"><a>Faça login</a></Link></p>
                <p>Ainda não tem conta? <Link to="/cadastro"><a>Cadastre-se aqui</a></Link></p>
            </div>
        </div>
    </div>
);

export default RecuperarSenha;