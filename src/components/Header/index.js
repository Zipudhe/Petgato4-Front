import "./style.css";

import icone_petgato from '../../assets/gatinho_petgato_branco.svg';
import { Link } from "@reach/router";

export default function Header(){
    return(
        <div className="header">
            <img alt="PetGatô" src={icone_petgato}/>
            <div className="links">
                <Link to="/">Página Inicial</Link>
                <Link to="/sobre">Sobre Nós</Link>
                <Link to="/contato">Fale Conosco</Link>
                <Link to="/login">Entrar</Link>
            </div>
        </div>
    );
}
