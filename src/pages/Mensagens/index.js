import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListMessages from '../../components/ListMessages';

import './styles.css';

export default function Mensagens({page}){
    return (
        <div>
            <Header backoffice={true} atual={6} />
            <div className="backoffice-mensagens">
                <h2>BACKOFFICE</h2>
                <h1>Mensagens de Contato</h1>
                <ListMessages />
            </div>
            <Footer />
        </div>
    );
}