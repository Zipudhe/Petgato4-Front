import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LoadingCat from '../../components/LoadingCat';

import "./styles.css";
import camera_icon from "../../assets/awesome-camera.svg";
import profile_user_image from "../../assets/images/cintialorenzzo.jpeg";

const EditarPerfil = () => {
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    let history = useHistory();

    function changeName(name) {
        setName(name);
    }

    function changePassword(password) {
        setPassword(password);
    }

    function changeNewPassword(password) {
        setNewPassword(password);
    }

    function changeConfirmNewPassword(password) {
        setConfirmNewPassword(password);
    }
    
    const changeFile = ( img ) => {
        console.log(img);
        setImage(img);
    }

    const saveUser = async () => {
        const token = localStorage.getItem('token');
        const formData = {};
        //formData.append('name', name);

        if(name.length > 0){
            formData.name = name;
        }

        if(newPassword.length > 0){
            if(newPassword === confirmNewPassword) {
                //formData.append('password', newPassword);
                formData.password = newPassword;
            } else{
                alert('As senhas não são iguais!');
                return;
            }
        }

        if(image){
            //formData.append('profile_image', image);
            formData.profile_image = image;
        }

        console.log(formData);


        // tentar autenticar o usuário com a senha atual que ele inseriu
        axios.put(`http://localhost:3000/users/${localStorage.getItem('current_user')}`,
        formData, {
            headers: {
                'Authorization': token
            }
        })
        .catch(error => history.push("/erro"));
    }

    const loadUser = async () => {
        const token = localStorage.getItem('token');
        let temp_user = {};

        await axios.get(`http://localhost:3000/users/${localStorage.getItem('current_user')}`, {
                headers: {
                    'Authorization': token
                }
            })
            .then(response => temp_user = response.data)
            .catch(error => history.push("/erro"));
        
        setUser(temp_user);
        setName(temp_user.name);
        setLoading(false);
    }

    useEffect(() => {
        loadUser();
    }, [loading])

    return (
        <div className="container-editar-perfil">
            <div className="header-editar-perfil"><Header atual={4} /></div>
            {loading ? (
                <LoadingCat />
            ) : (
                <div className="content-editar-perfil">
                    <div className="user-image">
                        <div className="container-user-image">
                            <img src={profile_user_image /*user.profile_image.url*/} />
                        </div>
                        <div className="container-alterar-foto" >
                            <img src={camera_icon} />
                            <a>Alterar sua foto de perfil</a>
                        </div>
                        <input className="file-input" type="file" accept="image/*" onChange={e => changeFile(e.target.files[0])} />
                    </div>

                    <div className="user-info">
                        <div className="title">
                            <h2>SUA CONTA</h2>
                            <h1>Edite seu perfil</h1>
                        </div>
                        <Input name="Nome" prevValue={user.name} handleValue={changeName} styles={1} />
                        <Input name="Email" prevValue={user.email} styles={1} disabled={true} />
                        <div>
                            <Input name="Nova senha" password={true} styles={1} handleValue={changeNewPassword} />
                            <p>Deixe em branco caso não queira alterar</p>
                        </div>
                        <Input name="Confirme sua senha" password={true} handleValue={changeConfirmNewPassword} styles={1} />
                        <Input name="Senha atual" password={true} styles={1} handleValue={changePassword} />
                        <Button styles={1} onClick={() => saveUser()}>SALVAR</Button>

                    </div>
                </div>
            )}
            <div className="footer-editar-perfil"><Footer /></div>
        </div>
    );
}

export default EditarPerfil;