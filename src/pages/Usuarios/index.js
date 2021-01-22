import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Pagination from '../../components/Pagination';
import LoadingCat from '../../components/LoadingCat';
import { convertDate } from '../../functions';

import './styles.css';

export default function Users({ pageRef=0 }){
    const [page, setPage] = useState(pageRef);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    
    let history = useHistory();

    const nextPage = () => {
        if(page < totalPages){
            setPage(page + 1);
        }
    }

    const prevPage = () => {
        if(page > 0){
            setPage(page - 1);
        }
    }

    const specificPage = () => {
        if(page === 0){
            setPage(2);
        } else {
            setPage(page - 2);
        }
    }

    function loadTotalPages( deleted=false ) {
        axios.get(`http://localhost:3000/users_count/`)
            .then((response) => response.data)
            .then((data) => {
                if(deleted && data > 0 && data % 5 === 0){
                    setPage(page - 1);
                    setTotalPages(totalPages - 1);
                } else{
                    setTotalPages(Math.ceil(data / 5));
                }
            })
            .catch((error) => console.error(error));
    }

    const deleteUser = (user_id) => {
        if(window.confirm("Tem certeza?")){
            axios.delete(`http://localhost:3000/users/${user_id}?page=${page}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then((response) => response.data)
                .then((data) => setUsers(data))
                .then(() => loadTotalPages(true))
                .catch((error) => history.push("/erro"));
        }
    }

    const loadUsers = async () => {
        setLoading(true);
        axios.get(`http://localhost:3000/users?page=${page}`)
            .then((response) => response.data)
            .then((data) => setUsers(data))
            .catch((error) => history.push("/erro"));
        setLoading(false);
    }

    useEffect(() => {
        loadUsers();
        loadTotalPages();
    }, [page])

    return (
        <div className="container-users">
            <div className="header-users"><Header backoffice={true} atual={4} /></div>
            <div className="content-users">
                <div className="backoffice-users">
                    <h2>BACKOFFICE</h2>
                    <h1>Usuários</h1>
                    {loading ? (
                        <div className="list-users-loading-cat"><LoadingCat /></div>
                    ) : (
                        <div className="container-table-users">
                            <table className="all-users">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Tipo de Usuário</th>
                                        <th>Data de Ingresso</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {users.map((user) => 
                                    (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.is_admin ? "Administrador" : "Usuário"}</td>
                                            <td>{convertDate(user.created_at)}</td>
                                            <td><Link to={`/editar-usuario/${user.id}`}>Editar</Link></td>
                                            <td>{user.id !== parseInt(localStorage.getItem('current_user')) && <a onClick={() => deleteUser(user.id)}>Excluir</a>}</td>
                                        </tr>
                                    )
                                )}
                                                        
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="backoffice-footer-users">
                        <div className="menu">
                            <Pagination actualPage={page+1} totalPages={totalPages} previous={() => prevPage()} next={() => nextPage()} specific={() => specificPage()} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-users"><Footer /></div>
        </div>
    );
}