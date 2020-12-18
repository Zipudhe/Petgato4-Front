import './style.css';

import SpanText from '../../components/SpanText';
import Input from '../../components/Input';
import Button from '../../components/Button';

import PetIcon from '../../assets/gatinho_petgato.svg';

export default function PageRecover(){
    return(
        <div className="pagebody">
            <div id="backgroundimg-recover">
            </div>
            <div className="info-text">
                <div className="content">
                    <img className="icon" alt="PetGato Icon" src={PetIcon} />
                    <Input name="Email"/>
                    <p className="intxt">Insira seu email para recuperar a senha</p>
                    <div className="recover-button">
                    <Button styles="3">RECUPERAR SENHA</Button>
                    </div>
                    <SpanText text="Lembrou a senha?" link="Faça Login" path="/login"/>
                    <SpanText text="Ainda não tem conta?" link="Cadastre-se" path="/signUp" />
                </div>
            </div>
        </div>
    )
}
