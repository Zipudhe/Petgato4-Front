import './styles.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ListPublications({page}){
    const [posts, setPosts] = useState([]);

    function converteData(data){
        data = data.split('T')[0].split('-').reverse()
        return data.join('/');
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/posts?page=${page}`)
        .then((response) => response.data)
        .then((data) => setPosts(data));
    }, [page]);
    
    function handleDelete(post_id){
        if(window.confirm("Tem certeza?")){
            axios.delete(`http://localhost:3000/posts/${post_id}`)
            .then(alert("Post excluído!"))
            .then(window.location.reload());
        }
    }

    return (
        <table className="all-publications">
            <tr>
                <th>#</th>
                <th>Data</th>
                <th>Título</th>
                <th></th>
                <th></th>
            </tr>
            {posts.map((post) => 
                (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{converteData(post.created_at)}</td>
                        <td><a href="/#">{post.name}</a></td>
                        <td><p>Editar</p></td>
                        <td><p onClick={() => handleDelete(post.id)}>Excluir</p></td>
                    </tr>
                )
            )}
        </table>
    );
}