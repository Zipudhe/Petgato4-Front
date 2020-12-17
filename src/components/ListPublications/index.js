import './styles.css';

export default function ListPublications({page}){
    let posts = [{
        id: 32, 
        data:"08/10/2019", 
        name: "As almofadinhas são importantes", 
        tags: ["Cuidados", "Cães & Gatos", "Guerreiros de Fé"]
    },{
        id: 32, 
        data:"06/10/2019", 
        name: "Carro de Malandro", 
        tags: ["Carros"]
    }
    ];
    
    return (
        <table className="all-publications">
            <tr>
                <th>#</th>
                <th>Data</th>
                <th>Título</th>
                <th>Tags</th>
                <th></th>
                <th></th>
            </tr>
            {posts.map((post) => 
                (
                    <tr>
                        <td>{post.id}</td>
                        <td>{post.data}</td>
                        <td><a href="#">{post.name}</a></td>
                        <td>{post.tags.join(', ')}</td>
                        <td><a href="#">Editar</a></td>
                        <td><a href="#">Excluir</a></td>
                    </tr>
                )
            )}
        </table>
    );
}