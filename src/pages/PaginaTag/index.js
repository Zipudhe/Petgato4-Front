import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import SearchBar from '../../components/SearchBar';
import Tag from '../../components/Tag';
import PublicacoesPopulares from '../../components/PublicacoesPopulares';
import PostPreview from '../../components/PostPreview';
import LoadingCat from '../../components/LoadingCat';

import './styles.css';

export default function PaginaInicial() {
    const [posts, setPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useParams();
    let history = useHistory();

    const loadPopularPosts = async () => {
        axios.get(`http://localhost:3000/popularposts`)
            .then((response) => response.data)
            .then((data) => setPopularPosts(data))
            .catch((error) => history.push("/erro") );
    }

    // carerga os posts que tem essa tag
    const loadPosts = async ( id ) => {
        axios.get(`http://localhost:3000/postsbytag/${id}`)
            .then((response) => response.data)
            .then((data) => setPosts(data))
            .catch((error) => history.push("/erro") );
        setLoading(false);
    }
    
    const loadTags = async () => {
        axios.get(`http://localhost:3000/alltags/`)
            .then((response) => response.data)
            .then((data) => setTags(data))
            .catch(error => history.push("/erro"));
    }

    const loadTag = async ( id ) => {
        axios.get(`http://localhost:3000/tags/${id}`)
            .then((response) => response.data)
            .then((data) => setTag(data))
            .catch(error => history.push("/erro"));
    }

    useEffect(() => {
        loadTag(location.id); // carrega a tag atual
        loadTags(); // carrega todas as tags
        loadPopularPosts();
        loadPosts(location.id);
    }, []);
    
    return (
        <div className="container-tagpage">
            <div className="tagpage-header"><Header atual={0} /></div>
            <div className="tagpage-info">
                <SearchBar />
                <h4>TODAS AS TAGS</h4>
                {tags.map(tag => (
                    <div className="container-tag" key={tag.id}>
                        <Link to={`/tag/${tag.id}`}><Tag text={tag.name} /></Link>
                    </div>
                ))}
                <h2>Publicações mais populares:</h2>
                <PublicacoesPopulares posts={popularPosts} />
                <div className="button-popular-posts">
                    <Link to="/"><Button styles="1">VER TODAS</Button></Link>
                </div>
            </div>

            <div className="tagpage-posts">
            <div className="tagpage-search"><SearchBar /></div>
                <div className="title-tags">
                <p><i>Tag: </i><b>{tag.name}</b></p>
                <p><i>{tag.description}</i></p>
                <p className="tags-subtitle">Estas são todas as publicações com a tag {tag.name}:</p>
                </div>
                {loading ? (
                    <LoadingCat />
                ) : (
                    posts.map((post) => (
                        <PostPreview post={post} key={post.id} />)
                    )
                )}
            </div>

            <div className="tagpage-footer"><Footer /></div>
        </div>
    );
}