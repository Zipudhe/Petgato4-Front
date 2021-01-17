import { Link } from 'react-router-dom';

import './styles.css';

import Tag from '../Tag';
import Favorite from '../Favorite';
import CommentIcon from '../CommentIcon';
import Views from '../Views';
import Button from '../Button';

import test from '../../assets/images/Login.jpg';

export default function PostPreview({post}){
    let tags = ["Cuidados", "Cães & Gatos", "Guias"];

    return (
        <div className="container-post">
            <div className="post-img">
                <Link to={`/post/${post.id}`}><img src={test} alt="Foto do post" /></Link>
            </div>
            <div className="post-content">
                <div className="tags">
                    <p>Tags:</p>
                    {tags.map((tag) => (
                        <Tag text={tag} key={tag} />)
                    )}
                </div>
                <div className="post-text">
                    <div className="post-title"><Link to={`/post/${post.id}`}><h1>{post.name}</h1></Link></div>
                    <div className="post-description" dangerouslySetInnerHTML={{__html: post.content.body}}></div>
                </div>
                <div className="post-footer">
                    <Link to={`/post/${post.id}`}><Button styles="1">LEIA MAIS</Button></Link>
                    <div>
                        <Favorite number={0} />
                        <CommentIcon number={0} />
                        <Views number={0} />
                    </div>
                </div>
            </div>
        </div>
    );
}