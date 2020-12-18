import React, { useState } from "react";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';

// ReactQuill
import ReactQuill from 'react-quill';
import { useQuill } from "react-quilljs";
import 'react-quill/dist/quill.snow.css';

import './styles.css';
import { ThemeProvider } from 'styled-components';

export default function NovaPublicacao(){
    const { quill, quillRef } = useQuill();
    const [savedText, setSavedText] = useState("");
    const [savedTitle, setSavedTitle] = useState("");

    // preciso de todas as tags disponíveis aqui
    let tags = ['Adestramento', 'Aves', 'Adoção'];

    //<ReactQuill theme="snow" ref={quill} modules={modules} placeholder={"Escreva a publicação aqui..."}/>
    const handleSave = () => {
        const text = quill.getText();
        setSavedText(text);

        sendText(quill.container.firstChild.innerHTML);
    };

    const sendText = (text) => {
        console.log(text);
        alert(savedTitle);
    }

    function handleChange(e) {
        this.setState({ value: e.target.value });
        setSavedText(this.value);
        console.log(savedTitle);
    }

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
    const myChangeHandler = (event) => {
        //this.setState({ value: event.target.value });
        console.log(event.target.value);
    }
    return (
        <div>
            <Header />
            <div className="backoffice-publicacao">
                <h2>BACKOFFICE</h2>
                <h1>Nova Publicação</h1>
                <input type='text' onChange={myChangeHandler} />
                <div className="input-title"><Input name="Título da Publicação" /></div>
                <div className="texto-publicacao" ref={quillRef}>
                    
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

                <div className="gerenciar-tags"><Button onClick={handleSave} styles="1">GERENCIAR TAGS</Button></div>
                <div className="footer-buttons">
                    oi
                </div>
            </div>
            <Footer />
        </div>
    );
}