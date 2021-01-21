import comment_icon from '../../assets/awesome-comment-alt.svg';

import './styles.css';

const CommentIcon = ({ number=0 }) => {
    return (
        <div className="container-comment-icon">
            <img className="comment-icon" src={comment_icon} alt="Comentários" />
            <p className="comment-number">{number}</p>
        </div>
    );
}

export default CommentIcon;