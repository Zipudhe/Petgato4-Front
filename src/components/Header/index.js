import "./style.css";

import Icon from '../../assets/gatinho_petgato_branco.svg';

export default function Header(){
    return(
        <div className="header">
            <img alt="icon petgato" src={Icon}/>
            <div className="links">
                <p>Página Inicial</p>
                <p>Sobre Nós</p>
                <p>Fale Conosco</p>
                <p>Entrar</p>
            </div>
        </div>
    )
}