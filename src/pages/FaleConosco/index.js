import { useState } from 'react';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';

import dog_image from '../../assets/images/Imagem de Contato.jpg';

import "./styles.css";

export default function FaleConosco(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function changeName(name) {
        setName(name);
    }

    function changeEmail(email) {
        setEmail(email);
    }

    function changeMessage(message) {
        setMessage(message);
    }

    const sendMessage = () => {
        if(name.length === 0){
            alert('O campo "Nome" não pode ficar em branco!');
            return;
        }

        if(email.length === 0){
            alert('O campo "Email" não pode ficar em branco!');
            return;
        }

        if(message.length === 0){
            alert('O campo "Mensagem" não pode ficar em branco!');
            return;
        }

        axios.post(`http://localhost:3000/messages/`, {
                name: name,
                email: email,
                description: message
            })
            .then(response => alert('Sua mensagem foi enviada com sucesso!'))
            .catch((error) => alert('Ocorreu um erro ao processar sua mensagem!'));
    }

    return (
        <div className="container-fale-conosco">
            <div className="header-fale-conosco"><Header atual={3} /></div>
            <div className="container-enviar-mensagem">
                <div className="dog-image">
                    <img src={dog_image} />
                </div>

                <div className="user-info">
                    <h2>FALE CONOSCO</h2>
                    <h1>Envie-nos uma mensagem de cão-tato</h1>
                    
                    <div className="container-input">
                        <Input name="Nome" styles={1} handleValue={changeName} />
                        <Input name="Email" styles={1} handleValue={changeEmail} />
                    </div>

                    <div className="input-message">
                        <TextArea name="Mensagem" styles={1} handleValue={changeMessage} textholder="Digite aqui sua moew-sagem..." />
                    </div>

                    <div className="container-button">
                        <Button styles={1} onClick={sendMessage}>ENVIAR</Button>
                    </div>
                </div>
            </div>
            <div className="footer-fale-conosco"><Footer /></div>
        </div>
    );
}