import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';

export default function CriarTag(){
    return (
        <div>
            <Header />
            <div className="backoffice-criartag">
                <h2>BACKOFFICE</h2>
                <h1>Nova Tag</h1>
                <Input name={"Nome da Tag"} />
                <Input name={"Descrição da Tag"} />

                <div className="container-buttons">
                    <div className="btn">
                        <Button onClick={() => alert('AQUI NÃO')} styles="3">SALVAR</Button>
                    </div>
                    <div className="btn">
                        <Button onClick={() => alert('AQUI NÃO')} styles="1">VOLTAR</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}