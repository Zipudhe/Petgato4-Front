import './style.css';

import facebook_icon from '../../assets/awesome-facebook-square.svg';
import instagram_icon from '../../assets/awesome-instagram.svg';
import twitter_icon from '../../assets/awesome-twitter-square.svg';
import cintia_lorenzzo from '../../assets/images/Cíntia Lorenzzo.jpg';

export default function PerfilHome({text, link, path}){
    return(
        <div className="about-frame">
            <div className="crop-image">
                <img alt="Cíntia Lorenzzo" src={cintia_lorenzzo} />
            </div>
            <h5>SOBRE A AUTORA</h5>
            <h1>Cíntia Lorenzzo</h1>

            <p>
                Sou veterinária há 5 anos, apaixonada pelo mundo animal, 
                principalmente os que estão sempre conosco no dia a dia. 
                Quando não estou no meu consultório com meus pets, 
                estou aqui escrevendo conteúdo para vocês. Espero que você goste!
            </p>

            <div className="social-media-icons">
                <a href="https://www.facebook.com" target="_blank"><img alt="Facebook" src={facebook_icon} /></a>
                <a href="https://www.instagram.com" target="_blank"><img alt="Instagram" src={instagram_icon} /></a>
                <a href="https://www.twitter.com" target="_blank"><img alt="Twitter" src={twitter_icon} /></a>
            </div>
        </div>
    )
}