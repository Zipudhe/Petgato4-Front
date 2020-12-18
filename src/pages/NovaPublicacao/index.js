import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './styles.css';
import { ThemeProvider } from 'styled-components';

export default function NovaPublicacao(){
    // preciso de todas as tags disponíveis aqui
    let tags = ['Adestramento', 'Aves', 'Adoção'];

    function temp() {
        var a = quill.getText(0, 10);
        console.log(a);
    }

    return (
        <div>
            <Header />
            <div className="backoffice-publicacao">
                <h2>BACKOFFICE</h2>
                <h1>Nova Publicação</h1>
                <div className="input-title"><Input name="Título da Publicação"/></div>
                <div className="texto-publicacao"><ReactQuill theme="snow" /></div>

                <h3>Escolha uma imagem de capa:</h3>
                <p>Nenhum arquivo escolhido</p>

                <h3>Escolha pelo menos uma tag:</h3>
                {tags.map((tag) => 
                (   
                    <div className="container-tags">
                        <input type="checkbox" name={tag} />
                        <label for={tag}>{tag}</label>
                    </div>
                )
                )}

                <div className="gerenciar-tags"><Button onClick={() => temp()} styles="1">GERENCIAR TAGS</Button></div>
                <div className="footer-buttons">
                    oi
                </div>
                
                
            </div>
            <Footer />
        </div>
    );
}