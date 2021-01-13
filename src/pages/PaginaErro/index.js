import Header from '../../components/Header';
import Footer from '../../components/Footer';
import error_petgato from '../../assets/error_petgato.gif';

import './styles.css';

export default function PaginaErro({ error=0 }){
    return (
        <div className="container-error-petgato">
            <div className="header-error-petgato"><Header atual={0} /></div>

                {error === 1 ? ( // acesso não permitido
                    <div className="error-petgato">
                        <h2>Você não tem permissão para acessar essa página.</h2>
                        <img src={error_petgato} alt="Erro!" />
                        <p>Faça login e/ou verifique se sua conta está como administrador.</p>
                    </div>
                ) : (
                error === 2 ? ( // página não existe
                    <div className="error-petgato">
                        <h2>Oops... Parece que essa página não existe.</h2>
                        <img src={error_petgato} alt="Erro!" />
                        <p>Verifique o endereço e tente novamente. Se o problema persistir, entre em contato conosco.</p>
                    </div>
                ) : ( // erro não identificado
                    <div className="error-petgato">
                        <h2>Oops... Parece que encontramos um erro não identificado!</h2>
                        <img src={error_petgato} alt="Erro!" />
                        <p>Tente acessar a página novamente. Se o problema persistir, entre em contato conosco.</p>
                    </div>
                ))}

            <div className="footer-error-petgato"><Footer /></div>
        </div>
    );
}