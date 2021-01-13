import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListReports from '../../components/ListReports';

import './styles.css';

export default function Denuncias({page}){
    return (
        <div>
            <Header backoffice={true} atual={5} />
            <div className="backoffice-denuncias">
                <h2>BACKOFFICE</h2>
                <h1>Denúncias</h1>
                <ListReports />
            </div>
            <Footer />
        </div>
    );
}