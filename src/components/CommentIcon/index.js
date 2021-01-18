import React from 'react';import style from './styles.css';
import comment_icon from '../../assets/awesome-comment-alt.svg';

const CommentIcon = ({ number=0 }) => {
    return (
        <div className="container-comment-icon">
            <img className="comment-icon" src={comment_icon} alt="Comentários" />
            <p className="comment-number">{number}</p>
        </div>
    );
}

export default CommentIcon;