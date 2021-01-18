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
import LoadingCat from '../../components/LoadingCat';

import heart_off from '../../assets/awesome-heart-1.svg';
import heart_on from '../../assets/awesome-heart.svg';
import temp_image from '../../assets/images/Esqueciminhasenha.jpg';

import './styles.css';
import { isAuthenticated } from '../../auth';

export default function PaginaPublicacao() {
    const [post, setPost] = useState('');
    const [loading, setLoading] = useState(true);
    const [favorited, setFavorited] = useState(false);
    const location = useParams();
    let history = useHistory();
    let postContent = post.content;

    const convertNumber = (number) => (
        number < 10 ? ("0" + number.toString()) : (number.toString())
    )

    const convertDate = (date) => {
        let meses = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        let newDate = date.split('T')[0].split('-');
        let newTime = date.split('T')[1].split(':');

        let day = newDate[2];
        let hour = newTime[0] - 3;

        if(hour < 0){
            hour += 24;
            day -= 1;
        }

        let ans = `
        Publicado em ${day} 
        de ${meses[parseInt(newDate[1])]} 
        de ${newDate[0]} 
        às ${convertNumber(parseInt(hour))}h${newTime[1]}
        `

        return ans;
    }

    const changeFavorite = () => {
        // trocar no back também (fazer put)
        setFavorited(!favorited);
    }

    // pegar pelo titulo dps tb como fazer
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

    useEffect(() => {
        loadPost(location.id);
    }, [])

    return (
        <div className="container-page-publicacao">
            <Header atual={0} />
            <Link to="/"><div>  <p>Voltar</p></div></Link>
            {!post ? (
                <div>
                    <LoadingCat />
                </div>
            ) : (
                <div className="container-publicacao">
                    <div className="content-publicacao">
                        <h1>{post.name}</h1>
                        <div className="post-informations">
                            <p className="data-publicacao"><i>{convertDate(post.created_at)}</i></p>
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

                    <div>
                        all right ->
                    </div>
                </div>
                )}
            <div className="footer-publicacao"><Footer /></div>
        </div>
    );
}