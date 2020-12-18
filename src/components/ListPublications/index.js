import './styles.css';

import axios from 'axios';
import { useEffect, useState } from 'react';


export default function ListPublications({page}){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/posts?page=${page}`)
        .then((response) => response.data)
        .then((data) => setPosts(data));
    }, [page]);
    
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
                    <tr>
                        <td>{post.id}</td>
                        <td>{post.created_at.slice(0, 10)}</td>
                        <td><a href="/#">{post.name}</a></td>
                        <td><a href="/#">Editar</a></td>
                        <td><a href="/#">Excluir</a></td>
                    </tr>
                )
            )}
        </table>
    );
}