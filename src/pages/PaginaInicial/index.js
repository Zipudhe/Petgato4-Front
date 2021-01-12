import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PerfilHome from '../../components/PerfilHome';
import PostPreview from '../../components/PostPreview';
import LoadingCat from '../../components/LoadingCat';

import './styles.css';

export default function PaginaInicial() {
    const page = 0; //const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPosts = async () => {
        axios.get(`http://localhost:3000/posts?page=${page}`)
            .then((response) => response.data)
            .then((data) => setPosts(data))
            .catch((error) => alert('redirecionar para página de erro com dom'));
        setLoading(false);
    }

    useEffect(() => {
        loadPosts();
    }, [page]);
    return (
        <div className="container-homepage">
            <div className="homepage-header"><Header /></div>
            <div className="homepage-info">
                <PerfilHome />
            </div>

            <div className="homepage-posts">
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