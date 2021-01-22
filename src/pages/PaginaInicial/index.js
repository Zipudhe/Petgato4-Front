import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import SearchBar from '../../components/SearchBar';
import PerfilHome from '../../components/PerfilHome';
import PostPreview from '../../components/PostPreview';
import Pagination from '../../components/Pagination';
import PublicacoesPopulares from '../../components/PublicacoesPopulares';
import LoadingCat from '../../components/LoadingCat';

import './styles.css';

export default function PaginaInicial({ pageRef = 0 }) {
    const [page, setPage] = useState(pageRef);
    const [posts, setPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(false);
    const [value, setValue] = useState('');
    const [frontValue, setFrontValue] = useState('');
    let history = useHistory();
    
    function changeValue(value) {
        setValue(value);
    }

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

    function loadTotalPages( deleted=false ) {
        axios.get(`http://localhost:3000/countposts/`)
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

    const loadPopularPosts = async () => {
        axios.get(`http://localhost:3000/popularposts`)
            .then((response) => response.data)
            .then((data) => setPopularPosts(data))
            .catch((error) => history.push("/erro") );
    }

    const loadPosts = async () => {
        axios.get(`http://localhost:3000/posts?page=${page}`)
            .then((response) => response.data)
            .then((data) => setPosts(data))
            .catch((error) => history.push("/erro") );
        setLoading(false);
    }

    const searchPosts = async () => {
        axios.get(`http://localhost:3000/searchposts?q=${value}`)
            .then((response) => response.data)
            .then((data) => setPosts(data))
            .catch((error) => history.push("/erro") );
    }

    const submitSearch = () => {
        if(value === ''){
            alert('Você precisa digitar algo para pesquisar!');
        } else{
            setSearch(true);
            setFrontValue(value);

            setLoading(true);
            searchPosts();
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPosts();
        loadPopularPosts();
        loadTotalPages();
    }, [page]);

    /* Pesquisa em tempo real (consome muito)
    useEffect(() => {
        searchPosts();
    }, [value]);*/

    return (
        <div className="container-homepage">
            <div className="homepage-header"><Header atual={1} /></div>
            <div className="homepage-info">
                <div className="homepage-search"><SearchBar handleValue={changeValue} handleSubmit={submitSearch} /></div>
                <PerfilHome />
                <h2>Publicações mais populares:</h2>
                <div>
                    <PublicacoesPopulares posts={popularPosts} />
                </div>
                <div className="button-popular-posts">
                    <Link to="/"><Button styles="1">VER TODAS</Button></Link>
                </div>
            </div>

            <div className="homepage-posts">
                <div className="homepage-search">
                    <SearchBar handleValue={changeValue} handleSubmit={submitSearch} />
                </div>
                {search ? (
                    <div className="search-results">
                        <p><i>Mostrando resultados para: </i><b>{frontValue}</b></p>
                    </div>
                ) : (
                    <div>
                        <h1>Miau!</h1>
                        <h2>Seja bem vindo(a) ao blog PetGatô! Confira nosso conteúdo mais recente:</h2>
                    </div>
                )}

                {loading ? (
                    <LoadingCat />
                ) : (
                    posts.length === 0 ? (
                        <h4>
                            Não encontramos nenhum resultado para sua busca!
                        </h4>
                    ) : (
                        posts.map((post) => (
                            <PostPreview post={post} key={post.id} />)
                        )
                    )
                    
                )}

                <div className="menu">
                    <Pagination actualPage={page+1} totalPages={totalPages} previous={() => prevPage()} next={() => nextPage()} specific={() => specificPage()} />
                </div>
            </div>

            <div className="homepage-footer"><Footer /></div>
        </div>
    );
}