import './styles.css';

export default function ListUsers({page}){
    let users = [{
        nome: "Vito Lindo", 
        data:"08/10/2005", 
        tipo: "Administrador", 
    },{
        nome: "Daniezardo", 
        data:"08/10/1995", 
        tipo: "Usuário", 
    }
    ];
    
    return (
        <table className="all-users">
            <tr>
                <th>Nome</th>
                <th>Tipo de Usuário</th>
                <th>Data de Ingresso</th>
                <th></th>
                <th></th>
            </tr>
            {users.map((user) => 
                (
                    <tr>
                        <td>{user.nome}</td>
                        <td>{user.tipo}</td>
                        <td>{user.data}</td>
                        <td><a href="#">Editar</a></td>
                        <td><a href="#">Excluir</a></td>
                    </tr>
                )
            )}
        </table>
    );
}