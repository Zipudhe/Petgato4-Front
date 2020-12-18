import './styles.css';

export default function ListTags({page}){
    let tags = [{
        nome: "Harmonico", 
        numero:12, 
        id: 1, 
    },{
        nome: "Pitágoras", 
        numero:37, 
        id: 2, 
    }
    ];
    
    return (
        <table className="all-tags">
            <tr>
                <th>#</th>
                <th>Nº de Publicações</th>
                <th>Nome</th>
                <th></th>
                <th></th>
            </tr>
            {tags.map((tag) => 
                (
                    <tr>
                        <td>{tag.id}</td>
                        <td>{tag.numero}</td>
                        <td>{tag.nome}</td>
                        <td><a href="#">Editar</a></td>
                        <td><a href="#">Excluir</a></td>
                    </tr>
                )
            )}
        </table>
    );
}