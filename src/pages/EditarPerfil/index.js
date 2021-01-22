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
import default_user_image from "../../assets/images/default_user_image.png";

const EditarPerfil = () => {
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [image, setImage] = useState(default_user_image);
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
        setImage(img);
    }

    const saveUser = async () => {
        
        if(name.length === 0){
            alert('O campo "Nome" não pode ficar em branco!');
            return;
        }

        if(newPassword.length > 0 && newPassword !== confirmNewPassword){
            alert('As senhas não coincidem!');
            return;
        }

        // autenticação da senha atual
        let correct_password = false;
        await axios.post(`http://localhost:3000/auth/login`, {
                email: user.email,
                password: password
            }).then((response) => {
                localStorage.setItem('token', response.data.token);
                correct_password = true;
            }).catch(error => {
                alert('A senha atual está errada, tente novamente!');
            })
        
        if(!correct_password){
            return;
        }
        
        let token = localStorage.getItem('token');
        const data = new FormData();
        let data2 = {};

        if(image){ // se tiver imagem para ser enviada
            data.append('profile_image', image);
        }

        if(newPassword.length > 0){
            data.append('password', newPassword);
            data2["password"] = newPassword;
        }

        data.append('name', name);
        data2["name"] = name;

        axios.put(`http://localhost:3000/users/${localStorage.getItem('current_user')}/`, data, {
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                    "Authorization": token
                }
            })
            .catch(error => history.push("/erro"));

        axios.put(`http://localhost:3000/users/${localStorage.getItem('current_user')}/`, data2, {
            headers: {
                "Authorization": token
            }
        })
        .catch(error => history.push("/erro"));

        alert('Dados alterados com sucesso!');
        window.location.reload();
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
                            <img src={user.url ? user.url : image} />
                        </div>
                        <label htmlFor="file-input-user-image">
                            <div className="container-alterar-foto" >
                                <img src={camera_icon} />
                                <a>Alterar sua foto de perfil</a>
                            </div>
                        </label>
                        <input id="file-input-user-image" className="file-input" type="file" multiple={false} accept="image/*" onChange={e => changeFile(e.target.files[0])} />
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