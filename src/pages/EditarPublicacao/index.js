import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
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
    const [selectedTags, setSelectedTags] = useState([]);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useParams();
    let history = useHistory();

    function changeTitle(title) {
        setTitle(title);
    }

    const changeCheckbox = ( id ) => {
        let index = selectedTags.indexOf(id);

        if(index === -1){
            selectedTags.push(id);
        } else{
            selectedTags.splice(index, 1);
        }
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
                history.push("/");
            });
    }

    function editPost( id ) {
        // adiciona as tags selecionadas
        axios.put(`http://localhost:3000/edit_tagpost/`, {
                post_id: id,
                tags: selectedTags.toString()
            })
            .then(response => console.log(response))
            .catch(error => console.error(error))
 
    }

    const loadTags = async (id) => {
        axios.get(`http://localhost:3000/alltags/`)
            .then((response) => response.data)
            .then((data) => setTags(data))
            .catch(error => history.push("/erro")); // colocar um erro de pop up
    }

    const loadSelectedTags = async (id) => {
        await axios.get(`http://localhost:3000/tagsbypost/${id}`)
            .then(response => response.data)
            .then(data => {
                data.map(tag => selectedTags.push(tag.id));
            })
        setLoading(false);
    }

    useEffect(() => {
        loadTags(location.id);
        loadPost(location.id);
        loadSelectedTags(location.id).then(console.log(selectedTags));
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
                {loading ? (
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
                                <input type="checkbox" name={tag.name} 
                                defaultChecked={selectedTags.indexOf(tag.id) === -1 ? false : true } 
                                onChange={() => changeCheckbox(tag.id)}
                                />
                                <span>{tag.name}</span>
                            </div>
                        )
                        )}
                        </div>
                        
                        <Link to="/tags"><Button styles="1">GERENCIAR TAGS</Button></Link>
                        
                        <div className="container-buttons">
                            <Button onClick={() => editPost(location.id)} styles="3">ATUALIZAR</Button>
                            <Button styles="1" onClick={() => history.goBack()}>VOLTAR</Button>
                        </div>
                    </div>
                )}
            </div>
            <div className="footer-editar-publicacao"><Footer /></div>
        </div>
    );
}