import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import LoadingCat from '../../components/LoadingCat';
import { base_url } from '../../api';

import './styles.css';

export default function Tags({ pageRef=0 }){
    const [page, setPage] = useState(pageRef);
    const [tags, setTags] = useState([]);
    const [tagPost, setTagPost] = useState([]);
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
        axios.get(`${base_url}/countags/`)
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

    const deleteTag = (tag_id) => {
        if(window.confirm("Tem certeza?")){
            axios.delete(`${base_url}/tags/${tag_id}?page=${page}`)
                .then((response) => response.data)
                .then((data) => setTags(data))
                .then(() => loadTotalPages(true))
                .catch((error) => history.push("/erro"));
        }
    }

    const loadTags = async () => {
        setLoading(true);
        axios.get(`${base_url}/tags?page=${page}`)
            .then((response) => response.data)
            .then((data) => {
                let tags_posts = [];

                // carrega o número de posts dessa tag
                data.map(tag => {
                    axios.get(`${base_url}/countagposts/${tag.id}`)
                        .then(post_number => tags_posts.push(post_number.data));
                
                //console.log(tags_posts);
                
                setTags(data);
                setTagPost(tags_posts);
                });
            })
            .catch((error) => history.push("/erro"));
        setLoading(false);
    }

    useEffect(() => {
        loadTags();
        loadTotalPages();
    }, [page])

    return (
        <div className="container-tags">
            <div className="header-tags"><Header backoffice={true} atual={3} /></div>
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
                                            <td>{tag.n_posts}</td>
                                            <td>{tag.name}</td>
                                            <td><Link to={`/editar-tag/${tag.id}`}>Editar</Link></td>
                                            <td><a onClick={() => deleteTag(tag.id)} >Excluir</a></td>
                                        </tr>
                                    )
                                )}
                                                        
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="backoffice-footer-tags">
                        <div className="btn">
                            <Link to="/criar-tag"><Button styles="1">NOVA TAG</Button></Link>
                        </div>
                        <div className="menu">
                            <Pagination actualPage={page+1} totalPages={totalPages} previous={() => prevPage()} next={() => nextPage()} specific={() => specificPage()} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-tags"><Footer /></div>
        </div>
    );
}