import Header from '../../components/Header';
//import Footer from '../../components/Footer';
import ListPublications from '../../components/ListPublications';
import Button from '../../components/Button';

import './styles.css';

export default function Publicacoes({page}){
    return (
        <div>
            <Header />
            <div className="backoffice-publicacoes">
                <h2>BACKOFFICE</h2>
                <h1>Todas as publicações</h1>
                <ListPublications page="0"/>
                <div className="backoffice-footer">
                    <div className="btn">
                        <Button onClick={() => alert('AQUI NÃO')} styles="1">NOVA PUBLICAÇÃO</Button>
                    </div>
                    <div className="menu">
                        1, 2, 3
                    </div>
                </div>
            </div>
            {//<Footer />
            }
        </div>
    );
}