import './style.css';

import SpanText from '../../components/SpanText';
import Input from '../../components/Input'; 

import PetIcon from '../../assets/gatinho_petgato.svg';

export default function PageRecover(){
    return(
        <div className="pagebody">
            <div className="image">
            </div>
            <div className="info-text">
                <div className="content">
                    <img className="icon" alt="PetGato Icon" src={PetIcon} />
                    <Input name="Email"/>
                    <p className="intxt">Insira seu email para recuperar a senha</p>
                    <button>Recuperar Senha</button>
                    <SpanText text="Lembrou a senha?" link="Faça Login" path="/login"/>
                    <SpanText text="Ainda não tem conta?" link="Cadastre-se aqui" path="/signIn" />
                </div>
            </div>
        </div>
    )
}
