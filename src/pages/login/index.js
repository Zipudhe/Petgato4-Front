import './style.css';

import SpanText from '../../components/SpanText';
import Input from '../../components/Input';
import Button from '../../components/Button';

import PetIcon from '../../assets/gatinho_petgato.svg';

export default function PageLogin(){
    return(
        <div className="pagebody">
            <div id="image">
            </div>
            <div className="info-text">
                <div className="content">
                    <img className="icon" alt="PetGato Icon" src={PetIcon} />
                    <Input name="Email"/>
                    <Input name="Senha" />
                    <div className="login-btn">
                        <Button onClick={() => alert('Login')} styles="3">ENTRAR</Button>
                    </div>
                    <SpanText link="Esqueci minha senha" path="/recover"/>
                    <SpanText text="Ainda não tem conta?" link="Cadastre-se" path="/signUp" />
                </div>
            </div>
        </div>
    )
}
