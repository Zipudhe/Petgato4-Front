import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import facebook_icon from '../../assets/awesome-facebook-square.svg';
import instagram_icon from '../../assets/awesome-instagram.svg';
import twitter_icon from '../../assets/awesome-twitter-square.svg';
import cintia_lorenzzo from '../../assets/images/Cíntia Lorenzzo.jpg';

import './styles.css';

export default function Sobre(){
    return (
        <div>
            <Header />
            <div className="container-sobre">
                <div className="img1">
                    <img src={cintia_lorenzzo} className="temp"/>
                </div>
                <div className="sobre-images">
                    
                </div>
                <div className="sobre-info">
                    <h2>SOBRE NÓS</h2>
                    <h1>O que é o Pet Gatô?</h1>
                    <p>O Pet Gatô surgiu em 2013, como um trabalho de faculdade. 
                        Estava cursando Medicina Veterinária e resolvi pegar uma disciplina de jornalismo, 
                        em que tive que escrever para um blog fictício.
                        Dei o nome de <b>Pet Gatô</b>, 
                        como um trocadilho infame que minha professora adorou.
                        Foi quando descobri minha paixão por escrever e resolvi unir o útil ao agradável e criar este blog.
                    </p>
                    <p>Desde então, utilizei deste meio para informar país de pets do Brasil inteiro,
                        estendendo os cuidados da mnha profissão através da Internet.
                        Além disso, compartilho histórias engraçadas, descobertas do meu cotidiano e fotos dos meus dois amores,
                        o Floquinho, meu cão samoeida e a Mandrágora, minha cacatua.
                    </p>
                    <p>
                        Meu nome é Cíntia Lorenzzo e sou veterinária há 5 anos, apaixonada pelo mundo animal,
                        principalmente os que estão sempre presentes no nosso dia a dia.
                        Além de escrever, gosto de correr no Parque do Ibirapuera com o Floquinho e cantar com a Mands, uma berradora nata.
                    </p>
                    <p>
                        Quer conhecer mais sobre mim? Me siga nas minhas redes sociais:
                    </p>
                    <div className="container-icons">
                        <a href="https://www.facebook.com" target="_blank"><img src={facebook_icon} alt="Facebook" /></a>
                        <a href="https://www.instagram.com" target="_blank"><img src={instagram_icon} alt="Instagram" /></a>
                        <a href="https://www.twitter.com" target="_blank"><img src={twitter_icon} alt="Twitter" /></a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}