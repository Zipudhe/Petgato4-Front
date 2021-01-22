import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Comment from '../Comment';
import Reply from '../Reply';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';

import './styles.css';
import { isAuthenticated } from '../../auth';

export default function ListComments({ comment }) {
    const [logged, setLogged] = useState(false);
    const [replies, setReplies] = useState([]);
    const [openResponse, setOpenResponse] = useState(false);
    const [response, setResponse] = useState(''); // resposta do usuário
    const [postResponse, setPostResponse] = useState(false);
    let history = useHistory();

    const loadReplies = async ( id ) => {
        axios.get(`http://localhost:3000/replies_by_comment/${id}`)
            .then(response => response.data)
            .then(data => setReplies(data))
    }

    const changeResponse = (response) => {
        setResponse(response);
    }

    const sendResponse = () => {
        if(response === ''){
            alert('Digite algo para poder enviar!');
            return;
        }

        axios.post(`http://localhost:3000/replies`, {
            comment_id: comment.comment_id,
            user_id: localStorage.getItem('current_user'),
            description: response
        })
        .catch((error) => history.push("/erro") );

        setResponse('');
        setPostResponse(!postResponse);
        setOpenResponse(false);

        window.location.reload();
    }

    useEffect(() => {
        isAuthenticated().then(logged => setLogged(logged));
    }, [logged])

    useEffect(() => {
        loadReplies(comment.comment_id);
    }, [postResponse])

    return (
        comment ? (
        <div className="comment-flow">
            <Comment comment={comment} />

            {replies.map(reply => 
                <div key={reply.reply_id}>
                    <Reply reply={reply} />
                </div>
            )}

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
        ) : (
            <p><i>Não foi possível carregar esse comentário</i></p>
        )
    );
}