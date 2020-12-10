import "./style.css";

import Icon from '../../assets/gatinho_petgato_branco.svg';

export default function Header(){
    return(
        <div className="header">
            <img alt="icon petgato" src={Icon}/>
            <div className="links">
                <a href="#">Página Inicial</a>
                <a href="#">Sobre Nós</a>
                <a href="#">Fale Conosco</a>
                <a href="#">Entrar</a>
            </div>
        </div>
    )
}