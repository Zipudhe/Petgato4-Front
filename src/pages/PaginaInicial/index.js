import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    let history = useHistory();

    const loadPosts = async () => {
        let temp_posts = [
            {
                id: 2,
                name: "Título do post"
            },
            {
                id: 3,
                name: "Post dois"
            },
            {
                id: 4,
                name: "Mais um post só que esse tem título grande"
            },
            {
                id: 5,
                name: "Pq não outro maior ainda o titulo maior que o de cima já era como pode ver"
            },
            {
                id: 6,
                name: "Ok parei, eh o ultimo"
            }
        ]

        setLoading(false);
        setPosts(temp_posts);

        /*
        axios.get(`http://localhost:3000/posts?page=${page}`)
            .then((response) => response.data)
            .then((data) => setPosts(data))
            .catch((error) => history.push("/erro") );
        setLoading(false);*/
    }

    useEffect(() => {
        loadPosts();
    }, []);
    
    return (
        <div className="container-homepage">
            <div className="homepage-header"><Header atual={1} /></div>
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