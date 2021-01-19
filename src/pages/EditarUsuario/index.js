import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LoadingCat from '../../components/LoadingCat';
import { convertDate } from '../../functions';

import './styles.css';

export default function EditarUsuario(){
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    let history = useHistory();

    const saveUser = async () => {
        const token = localStorage.getItem('token');

        axios.put(`http://localhost:3000/users/${localStorage.getItem('current_user')}`, {
                headers: {
                    'Authorization': token
                }
            })
            .then(response => console.log(response))
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
        setIsAdmin(temp_user.is_admin);
        setLoading(false);
    }

    useEffect(() => {
        loadUser();
    }, [loading])

    return (
        <div className="container-editar-usuario">
            <div className="header-editar-usuario"><Header backoffice={true} atual={4} /></div>
            <div className="content-editar-usuario">
                <div className="backoffice-editar-usuario">
                    <h2>BACKOFFICE</h2>
                    <h1>Editar Usuário</h1>
                    {loading ? (
                        <div className="list-editar-usuario-loading-cat"><LoadingCat /></div>
                    ) : (
                        <div className="input-editar-usuario">
                            <Input name="Nome" prevValue={user.name} styles={1} />
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