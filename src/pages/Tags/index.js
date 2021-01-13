import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import LoadingCat from '../../components/LoadingCat';

import './styles.css';

export default function Tags({ pageRef=1 }){
    const [page, setPage] = useState(pageRef);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const totalPages = 4;

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
        if(page === 1){
            setPage(3);
        } else {
            setPage(totalPages - 2);
        }
    }

    const deleteTag = (tag_id) => {
        if(window.confirm("Tem certeza?")){
            axios.delete(`http://localhost:3000/tags/${tag_id}?page=${page}`)
                .then((response) => response.data)
                .then((data) => setTags(data))
                .catch((error) => console.error(error));
        }
    }

    const loadTags = async () => {
        setLoading(true);
        axios.get(`http://localhost:3000/tags?page=${page}`)
            .then((response) => response.data)
            .then((data) => setTags(data))
            .catch((error) => (
                <Redirect to={{ pathname: '/erro', state: { from: error.location } }} />
            ));
        setLoading(false);
    }

    useEffect(() => {
        loadTags();
    }, [page])

    return (
        <div className="container-tags">
            <div className="header-tags"><Header /></div>
            <div className="content-tags">
                <div className="backoffice-tags">
                    <h2>BACKOFFICE</h2>
                    <h1>Todas as tags</h1>
                    {loading ? (
                        <div className="list-tags-loading-cat"><LoadingCat /></div>
                    ) : (
                        <div className="container-table-tags">
                            <table className="all-tags">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nº de Publicações</th>
                                        <th>Nome</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {tags.map((tag) => 
                                    (
                                        <tr key={tag.id}>
                                            <td>{tag.id}</td>
                                            <td>0</td>
                                            <td>{tag.name}</td>
                                            <td><Link to='/editar-tag'>Editar</Link></td>
                                            <td><a onClick={() => deleteTag(tag.id)} >Excluir</a></td>
                                        </tr>
                                    )
                                )}
                                                        
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="backoffice-footer">
                        <div className="btn">
                            <Button onClick={() => alert('AQUI NÃO')} styles="1">NOVA TAG</Button>
                        </div>
                        <div className="menu">
                            <Pagination actualPage={page} totalPages={totalPages} previous={() => prevPage()} next={() => nextPage()} specific={() => specificPage()} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-tags"><Footer /></div>
        </div>
    );
}