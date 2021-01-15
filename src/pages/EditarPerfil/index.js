import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import camera_icon from "../../assets/awesome-camera.svg";

import "./styles.css";
import profile_user_image from "../../assets/images/cintialorenzzo.jpeg";

const EditarPerfil = () => (
    <div className="container-editar-perfil">
        <div className="header-editar-perfil"><Header atual={4} /></div>
        <div className="content-editar-perfil">
            <div className="user-image">
                <div className="container-user-image"><img src={profile_user_image} /></div>
                <div className="container-alterar-foto" >
                    <img src={camera_icon} />
                    <a>Alterar sua foto de perfil</a>
                </div>
            </div>

            <div className="user-info">
                <div className="title">
                    <h2>SUA CONTA</h2>
                    <h1>Edite seu perfil</h1>
                </div>
                
                <div className="first-row">
                    <Input name="Nome" prevValue={"Cíntia Lorenzzo"} />
                    <Input name="Email" prevValue={"admin@petgato.com.br"} disabled={true} />
                </div>
                
                <div className="second-row">
                    <Input name="Nova senha" password={true} />
                    <Input name="Confirme sua senha" password={true} />
                </div>
                <p>Deixe em branco caso não queira alterar</p>

                <div className="footer">
                    <Input name="Senha atual" password={true} />
                    <div><Button styles={1} onClick={() => ( alert('SALVAR') )}>SALVAR</Button></div>
                </div>
            </div>
            
        </div>
        <div className="footer-editar-perfil"><Footer /></div>
    </div>
)

export default EditarPerfil;