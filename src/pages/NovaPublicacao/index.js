import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';

export default function NovaPublicacao(){
    // preciso de todas as tags disponíveis aqui
    let tags = ['Adestramento', 'Aves', 'Adoção'];

    return (
        <div>
            <Header />
            <div className="backoffice-publicacao">
                <h2>BACKOFFICE</h2>
                <h1>Nova Publicação</h1>
                <Input name="Título da Publicação"/>
                <p>campo</p>

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

                <div className="gerenciar-tags"><Button onClick={() => alert('GERENCIAR TAGS')} styles="1">GERENCIAR TAGS</Button></div>
                <div className="footer-buttons">
                    oi
                </div>
                
                
            </div>
            <Footer />
        </div>
    );
}