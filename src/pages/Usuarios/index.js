import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListUsers from '../../components/ListUsers';

import './styles.css';

export default function Usuarios({page}){
    return (
        <div>
            <Header backoffice={true} atual={4} />
            <div className="backoffice-usuarios">
                <h2>BACKOFFICE</h2>
                <h1>Usuários</h1>
                <ListUsers />
            </div>
            <Footer />
        </div>
    );
}