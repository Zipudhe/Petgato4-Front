import './styles.css';

export default function ListMessages({page}){
    let messages = [{
        remetente: "Vitor", 
        descricao:"Boa tarde, não tô afim de falar nada aqui mas por favor leia até o final", 
        data: "12/02/1981", 
    },{
        remetente: "Carrier", 
        descricao:"Carinho por cães é inadmissível", 
        data: "12/03/1999", 
    }
    ];
    
    return (
        <table className="all-messages">
            <tr>
                <th>Remetente</th>
                <th>Descrição</th>
                <th>Data de Envio</th>
                <th></th>
                <th></th>
            </tr>
            {messages.map((user) => 
                (
                    <tr>
                        <td>{user.remetente}</td>
                        <td>{user.descricao}</td>
                        <td>{user.data}</td>
                        <td><a href="#">Exibir</a></td>
                        <td><a href="#">Excluir</a></td>
                    </tr>
                )
            )}
        </table>
    );
}