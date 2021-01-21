import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';

import './styles.css';

export default function CriarPublicacao(){
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    let history = useHistory();

    function changeTitle(title) {
        setTitle(title);
    }

    const changeFile = ( img ) => {
        console.log(img);
        setImage(img);
    }

    const changeCheckbox = ( id ) => {
        let index = selectedTags.indexOf(id);

        if(index === -1){
            selectedTags.push(id);
        } else{
            selectedTags.splice(index, 1);
        }
    }

    function createPost() {
        
        if(title === ''){
            alert('Você precisa definir um título!');
            return;
        }

        if(value === ''){
            alert('Você precisa escrever algo no conteúdo do post!');
            return;
        }

        if(selectedTags.length === 0){
            alert('Você precisa selecionar ao menos uma tag!');
            return;
        }
        
        const data = new FormData();
        
        if(image){ // se o post tiver imagem
            data.append('banner', image);
        }

        data.append('name', title);
        data.append('content', value);

        // cria a publicação
        axios.post(`http://localhost:3000/posts/`, data, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
            .then(response => {
                console.log(response.data);
                selectedTags.map(id => {
                    axios.post(`http://localhost:3000/tag_posts/`, {
                        post_id: response.data.id,
                        tag_id: id
                    })
                })
            })
            .catch(error => history.push("/erro"));

        // foi publicado com sucesso
        
    }

    const loadTags = async () => {
        axios.get(`http://localhost:3000/alltags/`)
            .then((response) => response.data)
            .then((data) => setTags(data))
            .catch(error => history.push("/erro"));
    }

    useEffect(() => {
        loadTags();
    }, []);

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
        <div className="container-criar-publicacao">
            <div className="header-criar-publicacao"><Header backoffice={true} atual={2} /></div>
            <div className="content-criar-publicacao">
                <div className="backoffice-criar-publicacao">
                    <h2>BACKOFFICE</h2>
                    <h1>Criar Publicação</h1>

                    <div className="container-title">
                        <Input name="Título da Publicação" styles={1} handleValue={changeTitle} />
                    </div>

                    <div className="container-react-quill">
                        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} placeholder={"Escreva a publicação aqui..."}/>
                    </div>

                    <h3>Escolha uma imagem de capa:</h3>
                    <input className="file-input" type="file" accept="image/*" onChange={e => changeFile(e.target.files[0])} />
                    
                    <h3>Escolha pelo menos uma tag:</h3>
                    <div className="container-select-tags">
                        {tags.map((tag) => 
                        (
                            <div className="tag-content" key={tag.id}>
                                <input type="checkbox" name={tag.name} onChange={() => changeCheckbox(tag.id)} />
                                <span>{tag.name}</span>
                            </div>
                        )
                        )}
                    </div>
                    
                    <Link to="/tags"><Button styles="1">GERENCIAR TAGS</Button></Link>
                    
                    <div className="container-buttons">
                        <Button onClick={() => createPost()} styles="3">PUBLICAR</Button>
                        <Button styles="1" onClick={() => history.goBack()}>VOLTAR</Button>
                    </div>
                </div>
            </div>
            <div className="footer-criar-publicacao"><Footer /></div>
        </div>
    );
}