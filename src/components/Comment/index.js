import { useState } from 'react';
import axios from 'axios';

import './styles.css';
import feather_icon from '../../assets/feather-more-horizontal.svg';
import warning_icon from '../../assets/warning_icon.png';
import paw_icon from '../../assets/paw_icon.png';
import default_user_image from '../../assets/images/default_user_image.png';

import { convertDateText } from '../../functions';

export default function Comment({ comment }){
    const [opened, setOpened] = useState(false);

    const reportComment = async () => {
        let reportExist = false;

        await axios.get(`http://localhost:3000/isreportedcomment/${comment.comment_id}`)
                .then(response => reportExist = response.data)
        
        if(reportExist){
            alert('Este comentário já foi enviado para análise.');
        } else{
            axios.post(`http://localhost:3000/reports`, {
                comment_id: comment.comment_id
                //, reply_id: null
            })
            .then(alert('Sua denúncia foi enviada com sucesso!'))
        }
    }
    
    return (
        <div className="comment">
            <div className="user-image">
                <img src={comment.url ? comment.url : default_user_image} alt="Imagem do usuário" />
            </div>

            <div className="content-comment">
                <div className="title">
                <h2>{comment.author}{comment.is_admin && <img className="pet-icon" src={paw_icon} alt="Administrador" />}</h2>
                    
                    <div className="title-report">
                        {opened && 
                            <div className="report" onClick={() => reportComment(comment.comment_id)}>
                                <img src={warning_icon} alt="Reportar" /> Reportar
                            </div>
                        }
                        <img src={feather_icon} onClick={() => setOpened(!opened)} alt="Mais opções" />
                    </div>
                </div>
                <i>{convertDateText(comment.created_at)}</i>
                <p>{comment.comment_description}</p>
            </div>
        </div>
    );
}