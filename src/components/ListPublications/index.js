import './styles.css';

import axios from 'axios';
import { useEffect, useState, use } from 'react';

export default function ListPublications({pageRef}){
    const [page, setPage] = useState(pageRef);
    const [posts, setPosts] = useState([]);
    
    const converteData = (data) => (
        data.split('T')[0].split('-').reverse().join('/')
    );

    useEffect(() => {
        axios.get(`http://localhost:3000/posts?page=${page}`)
            .then((response) => response.data)
            .then((data) => setPosts(data))
            .catch((error) => console.error(error));
    }, [page, posts.length]);
    
    /*function loadPosts(page) {
        axios.get(`http://localhost:3000/posts?page=${page}`)
            .then((response) => response.data)
            .then((data) => setPosts(data))
            .catch((error) => console.error(error));
    }*/

    function handleDelete(post_id){
        if(window.confirm("Tem certeza?")){
            axios.delete(`http://localhost:3000/posts/${post_id}`);

            //loadPosts(posts);
            setPosts(posts);
        }
    }

    return (
        <table className="all-publications">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Data</th>
                    <th>Título</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
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
            </tbody>
        </table>
    );
}