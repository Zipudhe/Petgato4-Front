import { useState, useEffect } from 'react';

import './styles.css';
import feather_icon from '../../assets/feather-more-horizontal.svg';
import warning_icon from '../../assets/warning_icon.png';
import paw_icon from '../../assets/paw_icon.png';

export default function Reply({ author, text, date }){
    const [opened, setOpened] = useState(false);
    let id = 8; // passar o objeto do usuário...

    let user = {
        is_admin: true
    }

    const reportUser = ( id ) => {
        console.log(id);
    }

    if(text === ""){
        text = `AK do japão mt barulhenta
        `
    }
    
    return (
        <div className="reply">
            <div className="user-image">
                <img src={'https://portalrapmais.com/wp-content/uploads/2019/06/mc-igu.jpg'} />
            </div>

            <div className="content-reply">
                <div className="title">
                    <h2>{author}{user.is_admin && <img className="pet-icon" src={paw_icon} />}</h2>
                    
                    <div className="title-report">
                        {opened && 
                            <div className="report" onClick={reportUser(id)}>
                                <img src={warning_icon} /> Reportar
                            </div>
                        }
                        <img src={feather_icon} onClick={() => setOpened(!opened)} />
                    </div>
                </div>
                <i>{date}</i>
                <p>{text}</p>
            </div>
        </div>
    );
}