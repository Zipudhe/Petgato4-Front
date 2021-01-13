import React from 'react';
import Header from '../../components/Header';
//import Footer from './components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import UserImage from '../../components/UserImage';

import "./styles.css";
import profile_user_image from "../../assets/images/cintialorenzzo.jpeg";
import camera_icon from "../../assets/awesome-camera.svg";

const EditarPerfil = () => (
    <div>
        <Header atual={4} />
        <div className="container-editar-perfil">
            <div className="user-image">
                <UserImage source={profile_user_image} />
                <div className="container-alterar-foto" href="#">
                    <img src={camera_icon} />
                    Alterar sua foto de perfil
                </div>
                
            </div>

            <div className="user-info">
                <h2>SUA CONTA</h2>
                <h1>Edite seu perfil</h1>
                
                <div className="input-left">
                    <Input name="Nome" textholder={"Cíntia Lorenzzo"} />
                    <Input name="Nova senha" />
                    <p>Deixe em branco caso não queira alterar</p>
                    <Input name="Senha atual" />
                    <div className="container-button">
                        <Button styles={1} onClick={() => ( alert('SALVAR') )}>SALVAR</Button>
                    </div>
                </div>
                <div className="input-right">
                    <Input name="Email" textholder={"admin@petgato.com.br"} disabled={true} />
                    <Input name="Confirme sua senha" />
                </div>
            </div>
        </div>
        {//<Footer />
        }
    </div>
)

export default EditarPerfil;