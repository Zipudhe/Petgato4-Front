import { useEffect, useState } from 'react';
import axios from 'axios';

import Comment from '../Comment';
import Reply from '../Reply';

import './styles.css';

export default function ListComments({ comment }) {
    const [replies, setReplies] = useState([]);
    
    const loadReplies = async ( id ) => {
        axios.get(`http://localhost:3000/comments_by_post/${id}`)
            .then(response => response.data)
            .then(data => setReplies(data))
    }

    useEffect(() => {
        loadReplies(comment.id);
    }, [])

    return (
        comment ? (
        <div className="comment-flow">
            <Comment comment={comment} />

            {replies.map(replie => 
                <div key={8}>
                    oi
                </div>
            )}
        </div>
        ) : (<div>sai</div>)
    );
}