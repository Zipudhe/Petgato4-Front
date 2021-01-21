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
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [post, setPost] = useState([]);
    const [likes, setLikes] = useState(0);
    const [loading, setLoading] = useState(true);
    const location = useParams();
    let history = useHistory();

    function changeTitle(title) {
        setTitle(title);
    }

    const changeFile = ( img ) => {
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

    const loadLikes = ( id ) => {
        axios.get(`http://localhost:3000/countlikespost/${id}`)
            .then(response => response.data)
            .then(data => setLikes(data))
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
        
        if(image){ // se tiver imagem, alterá-la
            data.append('banner', image);
        }
        data.append('name', title);
        data.append('content', value);

        axios.put(`http://localhost:3000/posts/${location.id}`, data, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
        .catch(error => history.push("/erro"));

        // adiciona o título / conteúdo
        axios.put(`http://localhost:3000/posts/${id}`, {
                name: title,
                content: value
            })
            .catch(error => history.push("/erro"));

        // adiciona as tags selecionadas
        axios.put(`http://localhost:3000/edit_tagpost/`, {
                post_id: id,
                tags: selectedTags.toString()
            })
            .catch(error => history.push("/erro"));

        // foi publicado com sucesso
        
    }

    const loadTags = async (id) => {
        axios.get(`http://localhost:3000/alltags/`)
            .then((response) => response.data)
            .then((data) => setTags(data))
            .catch(error => history.push("/erro"));
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
        loadLikes(location.id);
        loadSelectedTags(location.id);
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
                                <Favorite number={likes} />
                                <CommentIcon number={0} />
                                <Views number={post.views} />
                            </div>
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