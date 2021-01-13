import "./style.css";

import { Link } from 'react-router-dom';
import icone_petgato from '../../assets/gatinho_petgato_branco.svg';
import { isAuthenticated } from '../../auth';

export default function Header({ backoffice=false, atual=1 }){
    return(
        <div className="header">
            <Link to="/"><img alt="PetGatô" src={icone_petgato}/></Link>
            {backoffice ? (
                <div className="links">
                    <Link to="/">Página Inicial</Link>
                    <Link to="/publicacoes">{atual === 2 ? (<a className="selected-header">Publicações</a>) : (<a>Publicações</a>)}</Link>
                    <Link to="/usuarios">{atual === 3 ? (<a className="selected-header">Usuários</a>) : (<a>Usuários</a>)}</Link>
                    <Link to="/denuncias">{atual === 4 ? (<a className="selected-header">Denúncias</a>) : (<a>Denúncias</a>)}</Link>
                    <Link to="/mensagens">{atual === 5 ? (<a className="selected-header">Mensagens</a>) : (<a>Mensagens</a>)}</Link>
                </div>
            ) : (
                <div className="links">
                    <Link to="/">{atual === 1 ? (<a className="selected-header">Página Inicial</a>) : (<a>Página Inicial</a>)}</Link>
                    <Link to="/sobre">{atual === 2 ? (<a className="selected-header">Sobre Nós</a>) : (<a>Sobre Nós</a>)}</Link>
                    <Link to="/contato">{atual === 3 ? (<a className="selected-header">Fale Conosco</a>) : (<a>Fale Conosco</a>)}</Link>
                    {isAuthenticated() ? (
                        <Link to="/editar-perfil">{atual === 4 ? (<a className="selected-header">Minha Conta</a>) : (<a>Minha Conta</a>)}</Link>
                    ) : (<Link to="/login"><a>Entrar</a></Link>)}
                </div>
            )}
        </div>
    );
}
