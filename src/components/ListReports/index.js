import './styles.css';

export default function ListReports({page}){
    let reports = [{
        id: 9, 
        data:"08/10/2019", 
        name: "As almofadinhas são importantes", 
        autor: "Tião"
    },{
        id: 16, 
        data:"01/10/2019", 
        name: "As almofadinhas são importantes: guia definitivo de como não usar", 
        autor: "Power Guido"
    }
    ];
    
    return (
        <table className="all-reports">
            <tr>
                <th>Nº</th>
                <th>Data</th>
                <th>Publicação</th>
                <th>Autor do comentário</th>
                <th></th>
            </tr>
            {reports.map((report) => 
                (
                    <tr>
                        <td>{report.id}</td>
                        <td>{report.data}</td>
                        <td><a href="#">{report.name}</a></td>
                        <td>{report.autor}</td>
                        <td><a href="#">Exibir</a></td>
                    </tr>
                )
            )}
        </table>
    );
}