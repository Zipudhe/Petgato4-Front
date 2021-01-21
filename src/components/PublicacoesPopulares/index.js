import { useHistory } from 'react-router-dom';

import { convertDateText } from '../../functions'; 

import './styles.css';

export default function PublicacoesPopulares({ posts }){
    let history = useHistory();

    return (
        <div className="container-publicacoes-populares">
            {posts.map(post => (
                <div key={post.id} className="content-publicacoes-populares">
                    <h3 onClick={() => {
                            history.push(`/post/${post.id}`);
                            window.location.reload();
                        }}>{post.name}
                    </h3>
                    <div className="text-publicacoes-populares" dangerouslySetInnerHTML={{__html: post.content.body}} />
                    <p><i>{convertDateText(post.created_at)}</i></p>
                </div>
            ))}
        </div>
    );
}