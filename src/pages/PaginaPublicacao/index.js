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
import default_post_image from '../../assets/images/default_post_image.jpg';

import './styles.css';
import { isAuthenticated } from '../../auth';
import { convertDateText } from '../../functions'; 

export default function PaginaPublicacao() {
    const [post, setPost] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState(0);
    const [favorited, setFavorited] = useState(false);
    const [popularPosts, setPopularPosts] = useState([]);
    const [logged, setLogged] = useState(false);
    const [openResponse, setOpenResponse] = useState(false);
    const [comment, setComment] = useState('');
    const [response, setResponse] = useState('');
    const location = useParams();
    let history = useHistory();
    let postContent = post.content;

    const changeComment = (comment) => {
        setComment(comment);
    }

    const changeResponse = (response) => {
        setResponse(response);
    }

    const sendComment = () => {
        if(comment === ''){
            alert('Digite algo para poder enviar!');
            return;
        }

        console.log(comment);
    }

    const sendResponse = () => {
        if(response === ''){
            alert('Digite algo para poder enviar!');
            return;
        }

        console.log(response);

        setResponse('');
        setOpenResponse(false);
    }

    const changeFavorite = () => {
        const user_id = localStorage.getItem('current_user');

        if(favorited){ // remove like
            setLikes(likes - 1);
            
            axios.delete(`http://localhost:3000/likes/${user_id}/${location.id}`)
                .catch((error) => history.push("/erro") );
            
        } else{ // adiciona like
            setLikes(likes + 1);

            axios.post(`http://localhost:3000/likes`, {
                post_id: location.id,
                user_id: user_id
            })
        }
        setFavorited(!favorited);
    }

    const loadLikes = async ( id ) => {
        axios.get(`http://localhost:3000/countlikespost/${id}`)
            .then(response => response.data)
            .then(data => data && setLikes(data))

        if(await isAuthenticated()){
            const user_id = localStorage.getItem('current_user');

            axios.get(`http://localhost:3000/likes/${user_id}/${id}`)
                .then(response => response.data)
                .then(data => setFavorited(data))
        }
    }

    const loadTags = async (id) => {
        axios.get(`http://localhost:3000/tagsbypost/${id}`)
            .then(response => response.data)
            .then(data => setTags(data))
    }

    const loadPost = async (id) => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then((response) => response.data)
            .then((data) => {
                setPost(data);

                // incrementa o número de visualizações
                axios.put(`http://localhost:3000/posts/${id}`, {
                    views: data.views + 1
                })
            })
            .catch((error) => history.push("/erro") );
        setLoading(false);
    }

    const loadPopularPosts = async () => {
        axios.get(`http://localhost:3000/popularposts`)
            .then((response) => response.data)
            .then((data) => setPopularPosts(data))
            .catch((error) => history.push("/erro") );
    }

    useEffect(() => {
        loadLikes(location.id);
        loadTags(location.id);
        loadPost(location.id);
    }, [likes])

    useEffect(() => {
        loadPopularPosts().then(response => setPopularPosts(response));
    }, [])

    useEffect(() => {
        isAuthenticated().then(logged => setLogged(logged));
    }, [logged])

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
                            <img src={default_post_image} />
                        </div>

                        <div className="text-publication" dangerouslySetInnerHTML={{__html: post.content.body}} />
                        
                        <div className="container-favorite">
                            {logged ? ( // autenticado
                                favorited ? ( // curtiu o post
                                    <div>
                                        <img src={heart_on} onClick={() => changeFavorite()} />
                                        <p>Você e outras {likes - 1} pessoas curtiram essa publicação!</p>
                                    </div>
                                ) : ( // não curtiu o post
                                    <div>
                                        <img src={heart_off} onClick={() => changeFavorite()} />
                                        <p>{likes} pessoas curtiram essa publicação! <i>Clique no coração para curtir.</i></p>
                                    </div>
                                )
                            ) : ( // não autenticado
                                <div className="heart-off">
                                    <img src={heart_off} />
                                    <p>{likes} pessoas curtiram essa publicação! <i>Faça login ou crie uma conta para poder curtir.</i></p>
                                </div>
                            )}
                        </div>
                        
                        <h2>Gostou? Deixe um comentário abaixo:</h2>
                        {isAuthenticated() ? (
                            <div className="content-comentario">
                                <TextArea textholder="Digite aqui seu comentário" handleValue={changeComment} />
                                <div className="send-button"><Button onClick={() => sendComment()} styles="1">ENVIAR</Button></div>
                            </div>
                        ) : (
                            <p><i>Você precisa entrar na sua conta para poder comentar!</i></p>
                        )}
                        
                        {//se nao tiver comentarios, mostrar mensagem
                        }
                        <div className="container-comments">
                            <Comment author={"Rodrigo Barão da Piscadinha"} text="" date={"Publicado em 14 de Janeiro de 2021 às 23h18"} />
                            <Reply author={"Igor Koishikawa"} text="" date={"Publicado em 14 de Janeiro de 2021 às 23h18"} />
                            
                            {logged && // está autenticado para poder responder
                            <div className="container-response">
                                {openResponse && 
                                <TextArea handleValue={changeResponse} textholder="Digite aqui seu comentário..." />
                                }
                                <div className="container-buttons">
                                    {openResponse && 
                                    <Button styles="3" onClick={() => sendResponse()} >
                                        ENVIAR
                                    </Button>
                                    }
                                    <Button styles="1" onClick={() => setOpenResponse(!openResponse)} >
                                        {openResponse ? "FECHAR" : "RESPONDER"}
                                    </Button> 
                                </div>
                            </div>
                            }

                        </div>
                    </div>

                    <div className="menu-right">
                        <SearchBar handleSubmit={() => history.push('/')} />
                        <h2>Explore essas tags:</h2>
                        {tags.map(tag => (
                            <div className="container-tag" key={tag.id}>
                                <Link to={`/tag/${tag.id}`}><Tag text={tag.name} /></Link>
                                <p>{tag.description}</p>
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