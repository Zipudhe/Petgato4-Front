import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import Comment from '../../components/Comment';
import Reply from '../../components/Reply';
import Favorite from '../../components/Favorite';
import Views from '../../components/Views';
import LoadingCat from '../../components/LoadingCat';

import './styles.css';

export default function PaginaPublicacao() {
    const [post, setPost] = useState('');
    const [loading, setLoading] = useState(true);
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

    // pegar pelo titulo dps tb como fazer
    const loadPost = async (id) => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then((response) => response.data)
            .then((data) => setPost(data))
            .catch((error) => history.push("/erro") );
        setLoading(false);
    }

    useEffect(() => {
        loadPost(location.id);
    }, [])

    return (
        <div className="container-page-publicacao">
            <Header atual={0} />
            {!post ? (
                <div>
                    <LoadingCat />
                </div>
            ) : (
                <div className="container-publicacao">
                    <div className="content-publicacao">
                        <div>Voltar</div>
                        <h1>{post.name}</h1>
                        <div className="post-informations">
                            <p className="data-publicacao"><i>{convertDate(post.created_at)}</i></p>
                            <Views number={post.views} />
                        </div>
                        
                        <div>
                            imagem da capa aqui (colocar border)
                        </div>

                        <div className="text-publication" dangerouslySetInnerHTML={{__html: post.content.body}} />
                        
                        <div>
                            <Favorite />
                        </div>

                        <h2>Gostou? Deixe um comentário abaixo:</h2>
                        <div className="content-comentario"><TextArea textholder="Digite aqui seu comentário" /></div>
                        <div className="send-button"><Button onClick={() => alert('ENVIAR')} styles="1">ENVIAR</Button></div>
                        {//se nao tiver comentarios, mostrar mensagem
                        }
                        <div className="container-comments">
                            <Comment author={"Rodrigo Barão da Piscadinha"} text="" date={"Publicado em 14 de Janeiro de 2021 às 23h18"} />
                            <Reply author={"Renato Farias"} text="" date={"Publicado em 14 de Janeiro de 2021 às 23h18"} />
                        </div>
                    </div>
                </div>
                )}
            <div className="footer-publicacao"><Footer /></div>
        </div>
    );
}