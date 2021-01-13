import React from 'react';
import Header from '../../components/Header';
//import Footer from './components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';

import "./styles.css";
import imagem_de_contato from "../../assets/images/Imagem de Contato.jpg";

const FaleConosco = () => (
    <div>
        <Header atual={3} />
        <div className="container-enviar-mensagem">
            <div className="dog-image">
                <img src={imagem_de_contato} />
            </div>

            <div className="user-info">
                <h2>FALE CONOSCO</h2>
                <h1>Envie-nos uma mensagem de cão-tato</h1>
                
                <div className="container-input">
                    <div className="name"><Input name="Nome" /></div>
                    <Input name="Nome" />
                </div>

                <div className="input-message">
                    <div className="message"><Input name="Mensagem" /></div>
                </div>
                <div className="container-button">
                    <Button styles={1} onClick={() => ( alert('ENVIAR') )}>ENVIAR</Button>
                </div>
            </div>
        </div>
        {//<Footer />
        }
    </div>
)

export default FaleConosco;