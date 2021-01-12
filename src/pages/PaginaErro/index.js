import Header from '../../components/Header';
import Footer from '../../components/Footer';
import error_petgato from '../../assets/error_petgato.gif';

import './styles.css';

export default function PaginaErro(){
    return (
        <div className="container-error-petgato">
            <div className="header-error-petgato"><Header /></div>
            <div className="error-petgato">
                <p>Oops... Parece que encontramos um erro!</p>
                <p>Tente acessar a página novamente. Se o problema persistir, entre em contato conosco!</p>
            </div>
            <div className="footer-error-petgato"><Footer /></div>
        </div>
    );
}