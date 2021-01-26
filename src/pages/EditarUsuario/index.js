import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LoadingCat from '../../components/LoadingCat';
import { convertDate } from '../../functions';
import { base_url } from '../../api';

import './styles.css';

export default function EditarUsuario(){
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useParams();
    let history = useHistory();

    function changeName(name) {
        setName(name);
    }
    
    const saveUser = async () => {
        
        if(name === ''){
            alert('O campo nome não pode ficar em branco!');
            return;
        }
        
        const token = localStorage.getItem('token');

        axios.put(`${base_url}/users/${location.id}`, {
                name: name,
                is_admin: isAdmin
            }, {
                headers: {
                    'Authorization': token
                }
            })
    }

    const loadUser = async () => {
        const token = localStorage.getItem('token');
        let temp_user = {};

        await axios.get(`${base_url}/users/${location.id}`, {
                headers: {
                    'Authorization': token
                }
            })
            .then(response => temp_user = response.data)
            .catch(error => alert('Esse usuário não existe!'));
        
        setUser(temp_user);
        setName(temp_user.name);
        setIsAdmin(temp_user.is_admin);
        setLoading(false);
    }

    useEffect(() => {
        loadUser();
    }, [])

    return (
        <div className="container-editar-usuario">
            <div className="header-editar-usuario"><Header backoffice={true} atual={4} /></div>
            <div className="content-editar-usuario">
                <div className="backoffice-editar-usuario">
                    <h2>BACKOFFICE</h2>
                    <h1>Editar Usuário</h1>
                    {loading ? (
                        <div className="list-editar-usuario-loading-cat">
                            <LoadingCat />
                        </div>
                    ) : (
                        <div className="input-editar-usuario">
                            <Input name="Nome" prevValue={user.name} styles={1} handleValue={changeName} />
                            <Input name="Email" prevValue={user.email} styles={1} disabled={true} />
                            <div className="role-selector">
                                <label>Tipo de usuário</label>
                                <select value={isAdmin ? 1 : 0} onChange={() => setIsAdmin(!isAdmin)} >
                                    <option value="0">Usuário</option>
                                    <option value="1">Administrador</option>
                                </select>
                            </div>
                            <Input name="Data de ingresso" prevValue={convertDate(user.created_at)} styles={1} disabled={true} />
                        </div>
                    )}
                    <div className="button-editar-usuario">
                        <Button onClick={() => saveUser()} styles="3">SALVAR</Button>
                        <Button styles="1" onClick={() => history.goBack()}>VOLTAR</Button>
                    </div>
                </div>
            </div>
            <div className="footer-editar-usuario"><Footer /></div>
        </div>
    );
}