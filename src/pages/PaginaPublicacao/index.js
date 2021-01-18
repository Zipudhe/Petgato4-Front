import { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import Comment from '../../components/Comment';
import Reply from '../../components/Reply';
import Views from '../../components/Views';
import SearchBar from '../../components/SearchBar';
import Tag from '../../components/Tag';
import PublicacoesPopulares from '../../components/PublicacoesPopulares';
import LoadingCat from '../../components/LoadingCat';

import heart_off from '../../assets/awesome-heart-1.svg';
import heart_on from '../../assets/awesome-heart.svg';
import arrow_left from '../../assets/awesome-chevron-left.svg';
import temp_image from '../../assets/images/Esqueciminhasenha.jpg';

import './styles.css';
import { isAuthenticated } from '../../auth';
import { convertDateText } from '../../functions'; 

export default function PaginaPublicacao() {
    const [post, setPost] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorited, setFavorited] = useState(false);
    const [popularPosts, setPopularPosts] = useState('');
    const location = useParams();
    let history = useHistory();
    let postContent = post.content;

    const changeFavorite = () => {
        // trocar no back também (fazer put)
        setFavorited(!favorited);
    }

    const loadTags = async (id) => {
        let temp_tags = ["Cuidados", "Cães & Gatos", "Guias"];

        setTags(temp_tags);
    }

    const loadPost = async (id) => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then((response) => response.data)
            .then((data) => {
                setPost(data)

                // incrementa o número de visualizações
                axios.put(`http://localhost:3000/posts/${id}`, {
                    views: data.views + 1
                })
            })
            .catch((error) => history.push("/erro") );
        setLoading(false);
    }

    const loadPopularPosts = async () => {
        axios.get(`http://localhost:3000/posts?page=${1}`)
            .then((response) => response.data)
            .then((data) => setPopularPosts(data))
            .catch((error) => history.push("/erro") );
    }

    useEffect(() => {
        loadPost(location.id);
        loadTags(); // colcoar isso no then do post
    }, [])

    useEffect(() => {
        loadPopularPosts().then(response => setPopularPosts(response));
    }, [])

    return (
        <div className="container-page-publicacao">
            <Header atual={0} />
            
            <div className="back-button">
                <img src={arrow_left} onClick={() => history.goBack()} />
                <p onClick={() => history.goBack()}>VOLTAR</p>
            </div>

            {!post || !popularPosts ? (
                <div>
                    <LoadingCat />
                </div>
            ) : (
                <div className="container-publicacao">
                    <div className="content-publicacao">
                        <h1>{post.name}</h1>
                        <div className="post-informations">
                            <p className="data-publicacao"><i>{convertDateText(post.created_at)}</i></p>
                            <Views number={post.views + 1} />
                        </div>
                        
                        <div className="post-image">
                            <img src={temp_image} />
                        </div>

                        <div className="text-publication" dangerouslySetInnerHTML={{__html: post.content.body}} />
                        
                        <div className="container-favorite">
                            {isAuthenticated() ? ( // autenticado
                                favorited ? ( // curtiu o post
                                    <div>
                                        <img src={heart_on} onClick={() => changeFavorite()} />
                                        <p>Você e outras {8+1} pessoas curtiram essa publicação!</p>
                                    </div>
                                ) : ( // não curtiu o post
                                    <div>
                                        <img src={heart_off} onClick={() => changeFavorite()} />
                                        <p>{8} pessoas curtiram essa publicação! <i>Clique no coração para curtir.</i></p>
                                    </div>
                                )
                            ) : ( // não autenticado
                                <div className="heart-off">
                                    <img src={heart_off} />
                                    <p>{8} pessoas curtiram essa publicação! <i>Faça login ou crie uma conta para poder curtir.</i></p>
                                </div>
                            )}
                        </div>
                        
                        <h2>Gostou? Deixe um comentário abaixo:</h2>
                        {isAuthenticated() ? (
                            <div className="content-comentario">
                                <TextArea textholder="Digite aqui seu comentário" />
                                <div className="send-button"><Button onClick={() => alert('ENVIAR')} styles="1">ENVIAR</Button></div>
                            </div>
                        ) : (
                            <p><i>Você precisa entrar na sua conta para poder comentar!</i></p>
                        )}
                        
                        {//se nao tiver comentarios, mostrar mensagem
                        }
                        <div className="container-comments">
                            <Comment author={"Rodrigo Barão da Piscadinha"} text="" date={"Publicado em 14 de Janeiro de 2021 às 23h18"} />
                            <Reply author={"Renato Farias"} text="" date={"Publicado em 14 de Janeiro de 2021 às 23h18"} />
                        </div>
                    </div>

                    <div className="menu-right">
                        <SearchBar />
                        <h2>Explore essas tags:</h2>
                        {tags.map(tag => (
                            <div className="container-tag" key={777}>
                                <Tag text={tag} />
                                <p>Então vamos colocar a descrição das tags aqui</p>
                            </div>
                        ))}
                        <h2>Publicações mais populares:</h2>
                        <PublicacoesPopulares posts={popularPosts} />
                        <div className="button-popular-posts">
                            <Link to="/"><Button styles="1">VER TODAS</Button></Link>
                        </div>
                    </div>
                </div>
                )}
            <div className="footer-publicacao"><Footer /></div>
        </div>
    );
}