import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';

// ReactQuill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './styles.css';
import { ThemeProvider } from 'styled-components';

export default function NovaPublicacao(){
    // preciso de todas as tags disponíveis aqui
    let tags = ['Adestramento', 'Aves', 'Adoção'];
    // formula: true, toolbar: 
    let modules = {
        toolbar: {
          container: [
            [{ 'font': [] }, { size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'header': 1 }, { 'header': 2 }, 'blockquote', 'code-block'],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" }
            ],
            [{ 'direction': 'rtl' }, { align: [] }],
            ["link", "image", "video", "formula"],
            ["clean"]
          ],
        },
        clipboard: { matchVisual: false }
      };

    return (
        <div>
            <Header />
            <div className="backoffice-publicacao">
                <h2>BACKOFFICE</h2>
                <h1>Nova Publicação</h1>
                <div className="input-title"><Input name="Título da Publicação"/></div>
                <div className="texto-publicacao">
                    <ReactQuill theme="snow" modules={modules} placeholder={"Escreva a publicação aqui..."}/>
                </div>

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

                <div className="gerenciar-tags"><Button onClick={() => alert('oi')} styles="1">GERENCIAR TAGS</Button></div>
                <div className="footer-buttons">
                    oi
                </div>
                
                
            </div>
            <Footer />
        </div>
    );
}