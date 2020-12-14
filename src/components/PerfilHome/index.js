import "./style.css";

import autor from '../../assets/images/cintialorenzzo.jpeg'
import { Link } from "@reach/router";

import fb from "../../assets/awesome-facebook-square.svg";
import ig from "../../assets/awesome-instagram.svg";
import twt from "../../assets/awesome-twitter-square.svg";

export default function PerfilHome({text, link, path}){
    return(
        <div className="main-frame">
            <img className="autor-pic" alt="Autora" src={autor}/>
            <p>SOBRE A AUTORA</p>
            <Link className="name-link" to="/">Cíntia Lorenzzo</Link>
            <p className="about">Sou veterinária a 5 anos,<br></br> 
                apaixonada pelo mundo animal,<br></br>
                principalmente os que estão sempre conosco no dia a dia.<br></br>
                Quando não estou no meu consultório com meus pets,<br></br>
                estou aqui escrevendo conteúdo para vocês. Espero que você
                <br></br> goste!
            </p>

            <div className="social-media-icons">
                <img alt="Facebook" src={fb}/>
                <img alt="Instagram" src={ig}/>
                <img alt="Twitter" src={twt}/>
            </div>
        </div>
    )
}