import { useState, useEffect } from 'react';

import './styles.css';
import feather_icon from '../../assets/feather-more-horizontal.svg';
import warning_icon from '../../assets/warning_icon.png';
import paw_icon from '../../assets/paw_icon.png';
import default_user_image from '../../assets/images/default_user_image.png';

import { convertDateText } from '../../functions';

export default function Reply({ reply }){
    const [opened, setOpened] = useState(false);

    const reportReply = ( id ) => {
        console.log(id);
    }
    
    return (
        <div className="reply">
            <div className="user-image">
                <img src={default_user_image} alt="Imagem do usuário" />
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