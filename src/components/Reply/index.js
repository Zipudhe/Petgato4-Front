import { useState } from 'react';
import axios from 'axios';

import './styles.css';
import feather_icon from '../../assets/feather-more-horizontal.svg';
import warning_icon from '../../assets/warning_icon.png';
import paw_icon from '../../assets/paw_icon.png';
import default_user_image from '../../assets/images/default_user_image.png';

import { convertDateText } from '../../functions';
import Axios from 'axios';

export default function Reply({ reply }){
    const [opened, setOpened] = useState(false);

    const reportReply = async ( id ) => {
        let replyExist = false;

        await axios.get(`http://localhost:3000/isreported/${reply.comment_id}/${reply.reply_id}`)
                .then(response => replyExist = response.data)
            
        if(replyExist){
            alert('Este comentário já foi enviado para análise.');
        } else{

            axios.post(`http://localhost:3000/reports`, {
                comment_id: reply.comment_id,
                reply_id: reply.reply_id
            })
            .then(alert('Sua denúncia foi enviada com sucesso!'))

        }

    }
    
    return (
        <div className="reply">
            <div className="user-image">
                <img src={reply.url ? reply.url : default_user_image} alt="Imagem do usuário" />
            </div>

            <div className="content-reply">
                <div className="title">
                    <h2>{reply.author}{reply.is_admin && <img className="pet-icon" src={paw_icon} alt="Administrador" />}</h2>
                    
                    <div className="title-report">
                        {opened && 
                            <div className="report" onClick={() => reportReply(reply.reply_id)}>
                                <img src={warning_icon} alt="Reportar" /> Reportar
                            </div>
                        }
                        <img src={feather_icon} onClick={() => setOpened(!opened)} alt="Mais opções" />
                    </div>
                </div>
                <i>{convertDateText(reply.created_at)}</i>
                <p>{reply.reply_description}</p>
            </div>
        </div>
    );
}