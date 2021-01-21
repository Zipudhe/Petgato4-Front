import { useState, useEffect } from 'react';

import './styles.css';
import feather_icon from '../../assets/feather-more-horizontal.svg';
import warning_icon from '../../assets/warning_icon.png';
import paw_icon from '../../assets/paw_icon.png';

export default function Comment({ author, text, date }){
    const [opened, setOpened] = useState(false);
    let id = 8; // passar o objeto do usuário...

    let user = {
        is_admin: false
    }

    const reportUser = ( id ) => {
        console.log(id);
    }

    if(text === ""){
        text = `Só basta você me ligar (aaaahhh), que eu vou correndo te encontrar!
        Brincadeiras a parte, ótimo post! Achei ótimo, também tenho um cachorro dessa raça
        e ele odeia fogos de artifício! O nome dele é Baroesa, porquê é uma cadela.
        E você chegou... Arrumadinha, mas tava linda... E a boca calou... E o coração se apaixonou...
        Éeee, e na hora que eu te beijei, foi melhor do que eu imaginei! Se eu soubesse tinha feito antes,
        no fundo sempre fomos bons amantes!
        Sim eu sou indecifrável
        `
    }
    
    return (
        <div className="comment">
            <div className="user-image">
                <img src={'https://capital95.com.br/wp-content/uploads/2020/08/baroes.jpg'} />
            </div>

            <div className="content-comment">
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