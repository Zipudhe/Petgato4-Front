import Header from '../../components/Header';
import Footer from '../../components/Footer';
import error_petgato from '../../assets/error_petgato.gif';

import './styles.css';

export default function PaginaErro(){
    return (
        <div className="container-error-petgato">
            <Header />
            <div className="error-petgato">
                <h1>Oops... Parece que encontramos um erro!</h1>
                <p>Tente acessar a página novamente. Se o problema persistir, entre em contato conosco!</p>
            </div>
            <Footer />
        </div>
    );
}