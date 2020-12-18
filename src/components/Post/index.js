import './styles.css';

import Tag from '../Tag';
import Favorite from '../Favorite';
import CommentIcon from '../CommentIcon';
import Button from '../Button';
import Views from '../Views';

import test from '../../assets/images/Login.jpg';

export default function Post(){
    let posts = [1,2,3,4,5]; // recebe como parâmetro uma postagem

    return (
        <div className="container-post">
            <img alt="Foto do post" className="post-img" src={test} />

            <div className="post-info">
                <div className="post-tags">
                    Tags:
                    <Tag text="Cães & Gatos"/>
                    <Tag text="Veterinária"/>
                    <Tag text="Emprego"/>
                </div>
                <p className="post-title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="post-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat blandit consequat. Aenean ut nibh ut arcu fringilla ultrices. Vivamus at tincidunt risus. Ut dapibus ut mi quis pellentesque...
                </p>
                <div className="post-footer">
                    <div className="post-button">
                        <Button styles="1">LEIA MAIS</Button>
                    </div>
                    <Favorite />
                    <CommentIcon />
                    <Views />
                </div>
            </div>
        </div>
    )
}