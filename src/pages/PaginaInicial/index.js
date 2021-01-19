import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import SearchBar from '../../components/SearchBar';
import PerfilHome from '../../components/PerfilHome';
import PostPreview from '../../components/PostPreview';
import PublicacoesPopulares from '../../components/PublicacoesPopulares';
import LoadingCat from '../../components/LoadingCat';

import './styles.css';

export default function PaginaInicial() {
    const page = 0;
    const [posts, setPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    let history = useHistory();

    const loadPopularPosts = async () => {
        axios.get(`http://localhost:3000/posts?page=${1}`)
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

    useEffect(() => {
        loadPosts();
        loadPopularPosts();
    }, []);
    
    return (
        <div className="container-homepage">
            <div className="homepage-header"><Header atual={1} /></div>
            <div className="homepage-info">
                <div className="homepage-search"><SearchBar /></div>
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
            <div className="homepage-search"><SearchBar /></div>
                <h1>Miau!</h1>
                <h2>Seja bem vindo(a) ao blog PetGatô! Confira nosso conteúdo mais recente:</h2>
                
                {loading ? (
                    <LoadingCat />
                ) : (
                    posts.map((post) => (
                        <PostPreview post={post} key={post.id} />)
                    )
                )}
            </div>

            <div className="homepage-footer"><Footer /></div>
        </div>
    );
}