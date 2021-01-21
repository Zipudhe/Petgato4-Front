import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import Tag from '../Tag';
import Favorite from '../Favorite';
import CommentIcon from '../CommentIcon';
import Views from '../Views';
import Button from '../Button';

import './styles.css';
import default_post_image from '../../assets/images/default_post_image.jpg';

export default function PostPreview({ post }){
    const [tags, setTags] = useState([]);
    const [likes, setLikes] = useState(0);
    const [commentNumber, setCommentNumber] = useState(0);
    let history = useHistory();

    const loadCommentNumber = ( id ) => {
        axios.get(`http://localhost:3000/comments_count/${id}`)
            .then(response => response.data)
            .then(data => data && setCommentNumber(data.n_comments))
    }

    const loadLikes = ( id ) => {
        axios.get(`http://localhost:3000/countlikespost/${id}`)
            .then(response => response.data)
            .then(data => data && setLikes(data))
    }

    const loadTags = ( id ) => {
        axios.get(`http://localhost:3000/tagsbypost/${id}`)
            .then(response => response.data)
            .then(data => setTags(data))
    }

    useEffect(() => {
        loadCommentNumber(post.id);
        loadLikes(post.id);
        loadTags(post.id);
    }, [])

    return (
        <div className="container-post">
            <div className="post-img">
                <Link to={`/post/${post.id}`}><img src={default_post_image} alt="Foto do post" /></Link>
            </div>
            <div className="post-content">
                <div className="tags">
                    <p>Tags:</p>
                    {tags.map((tag) => (
                        <div key={tag.id}
                            onClick={() => {
                                history.push(`/tag/${tag.id}`);
                                window.location.reload();
                        }}>
                            <Tag text={tag.name} />
                        </div>)
                    )}
                </div>
                <div className="post-text">
                    <div className="post-title"><Link to={`/post/${post.id}`}><h1>{post.name}</h1></Link></div>
                    <div className="post-description" dangerouslySetInnerHTML={{__html: post.content.body}}></div>
                </div>
                <div className="post-footer">
                    <Link to={`/post/${post.id}`}><Button styles="1">LEIA MAIS</Button></Link>
                    <div>
                        <Favorite number={likes} />
                        <CommentIcon number={commentNumber} />
                        <Views number={post.views} />
                    </div>
                </div>
            </div>
        </div>
    );
}