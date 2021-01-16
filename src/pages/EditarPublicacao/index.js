import { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Favorite from '../../components/Favorite';
import CommentIcon from '../../components/CommentIcon';
import Views from '../../components/Views';
import LoadingCat from '../../components/LoadingCat';

import './styles.css';

export default function EditarPublicacao(){
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [tags, setTags] = useState([]);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useParams();
    
    function changeTitle(title) {
        setTitle(title);
    }

    const loadPost = async (id) => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then((response) => response.data)
            .then((data) => {
                setPost(data);
                setTitle(data.name);
                setValue(data.content.body);
            })
            .catch((error) => {
                alert('Esse post não existe!');
                //history.push e tals
            });
        setLoading(false);
    }

    function editPost(id) {
        axios.put(`http://localhost:3000/posts/${id}`, {
            "name": title,
            "content": value
            })
            .catch((error) => console.error(error)); // colocar um erro de pop up
    }

    // carregar tags DO POST marcadas verificando né se tão
    const loadTags = async (id) => {
        axios.get(`http://localhost:3000/alltags/`)
            .then((response) => response.data)
            .then((data) => setTags(data))
            .catch((error) => (
                <Redirect to={{ pathname: '/erro', state: { from: error.location } }} />
            ));
    }

    useEffect(() => {
        loadPost(location.id);
        loadTags(location.id);
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
        <div className="container-editar-publicacao">
            <div className="header-editar-publicacao"><Header backoffice={true} atual={2} /></div>
            <div className="content-editar-publicacao">
                {post.length === 0 ? (
                    <LoadingCat />
                ) : (
                    <div className="backoffice-editar-publicacao">
                        <h2>BACKOFFICE</h2>
                        <h1>Editar Publicação</h1>

                        <div className="container-title">
                            <div>
                                <Input name="Título da Publicação" styles={1} handleValue={changeTitle} prevValue={post.name} />
                            </div>
                            
                            <div className="icons">
                                <Favorite number={0} />
                                <CommentIcon number={0} />
                                <Views number={post.views} />
                            </div>
                        </div>

                        <div className="container-react-quill">
                            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} placeholder={"Escreva a publicação aqui..."}/>
                        </div>

                        <h3>Escolha uma imagem de capa:</h3>
                        <div className="upload-content">
                            <Button onClick={() => alert('UPLOAD')} styles="1">Escolher Arquivo</Button>
                            <p>Nenhum arquivo escolhido</p>
                        </div>
                        <h3>Escolha pelo menos uma tag:</h3>
                        <div className="container-select-tags">
                        {tags.map((tag) => 
                        (   
                            <div className="tag-content" key={tag.id}>
                                <input type="checkbox" name={tag.name} />
                                <span>{tag.name}</span>
                            </div>
                        )
                        )}
                        </div>
                        
                        <Link to="/tags"><Button styles="1">GERENCIAR TAGS</Button></Link>
                        
                        <div className="container-buttons">
                            <Button onClick={() => editPost(location.id)} styles="3">ATUALIZAR</Button>
                            <Link to="/publicacoes"><Button styles="1">VOLTAR</Button></Link>
                        </div>
                    </div>
                )}
            </div>
            <div className="footer-editar-publicacao"><Footer /></div>
        </div>
    );
}