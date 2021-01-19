import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Tag from '../Tag';
import Favorite from '../Favorite';
import CommentIcon from '../CommentIcon';
import Views from '../Views';
import Button from '../Button';

import './styles.css';
import test from '../../assets/images/Login.jpg';

export default function PostPreview({ post }){
    const [tags, setTags] = useState([]);
    const [favoriteNumber, setFavoriteNumber] = useState(0);

    const loadFavoriteNumber = ( id ) => {
        axios.get(`http://localhost:3000/likes/post/${id}`)
            .then(response => response.data)
            .then(data => setFavoriteNumber(data))
    }

    const loadTags = ( id ) => {
        axios.get(`http://localhost:3000/tagsbypost/${id}`)
            .then(response => response.data)
            .then(data => setTags(data))
    }

    useEffect(() => {
        loadFavoriteNumber(post.id);
        loadTags(post.id);
    }, [])

    return (
        <div className="container-post">
            <div className="post-img">
                <Link to={`/post/${post.id}`}><img src={test} alt="Foto do post" /></Link>
            </div>
            <div className="post-content">
                <div className="tags">
                    <p>Tags:</p>
                    {tags.map((tag) => (
                        <Link to={`/tag/${tag.id}`}><Tag text={tag.name} key={tag.id} /></Link>)
                    )}
                </div>
                <div className="post-text">
                    <div className="post-title"><Link to={`/post/${post.id}`}><h1>{post.name}</h1></Link></div>
                    <div className="post-description" dangerouslySetInnerHTML={{__html: post.content.body}}></div>
                </div>
                <div className="post-footer">
                    <Link to={`/post/${post.id}`}><Button styles="1">LEIA MAIS</Button></Link>
                    <div>
                        <Favorite number={favoriteNumber} />
                        <CommentIcon number={0} />
                        <Views number={post.views} />
                    </div>
                </div>
            </div>
        </div>
    );
}