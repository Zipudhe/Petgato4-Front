import './style.css';

import Tag from '../Tag';
import Favorite from '../Favorite';
import CommentIcon from '../CommentIcon';
import Button from '../Button';

import test from '../../assets/images/Login.jpg';

export default function Post(){
    // recebe como parâmetro uma postagem

    return(
        <div className="post-frame">
            <img className="post-img" alt="post-banner" src={test}/>
            <div className="post-info">
                <p className="post-tags">
                    Tags: 
                    <Tag text="Loren"/>
                    <Tag text="Ipsum"/>
                    <Tag text="Dolor"/>
                </p>
                <p className="post-title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="post-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat blandit consequat. Aenean ut nibh ut arcu fringilla ultrices. Vivamus at tincidunt risus. Ut dapibus ut mi quis pellentesque...
                </p>
                <div className="post-details">
                    <div className="post-button">
                        <Button styles="1">LEIA MAIS</Button>
                    </div>
                    <Favorite number={0}/>
                    <CommentIcon/>
                </div>
            </div>
        </div>
    )
}