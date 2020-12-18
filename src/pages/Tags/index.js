import Header from '../../components/Header';
//import Footer from '../../components/Footer';
import ListTags from '../../components/ListTags';
import Button from '../../components/Button';

import './styles.css';

export default function Tags({page}){
    return (
        <div>
            <Header />
            <div className="backoffice-tags">
                <h2>BACKOFFICE</h2>
                <h1>Todas as tags</h1>
                <ListTags />
                <div className="backoffice-footer">
                    <div className="btn">
                        <Button onClick={() => alert('AQUI NÃO')} styles="1">NOVA TAG</Button>
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