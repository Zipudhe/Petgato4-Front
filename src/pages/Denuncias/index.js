import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Pagination from '../../components/Pagination';
import LoadingCat from '../../components/LoadingCat';
import { convertDate } from '../../functions';

import './styles.css';

export default function Users({ pageRef=0 }){
    const [page, setPage] = useState(pageRef);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    let history = useHistory();

    const nextPage = () => {
        if(page < totalPages){
            setPage(page + 1);
        }
    }

    const prevPage = () => {
        if(page > 0){
            setPage(page - 1);
        }
    }

    const specificPage = () => {
        if(page === 1){
            setPage(3);
        } else {
            setPage(totalPages - 2);
        }
    }

    function loadTotalPages( deleted=false ) {
        axios.get(`http://localhost:3000/report_count/`)
            .then((response) => response.data)
            .then((data) => {
                if(deleted && data > 0 && data % 5 === 0){
                    setPage(page - 1);
                    setTotalPages(totalPages - 1);
                } else{
                    setTotalPages(Math.ceil(data / 5));
                }
            })
            .catch((error) => console.error(error));
    }

    const deleteReport = (report_id) => {
        if(window.confirm("Tem certeza?")){
            axios.delete(`http://localhost:3000/reports/${report_id}?page=${page}`)
                .then((response) => response.data)
                .then((data) => setReports(data))
                .then(() => loadTotalPages(true))
                .catch((error) => history.push("/erro"));
        }
    }

    const loadReports = async () => {
        setLoading(true);
        axios.get(`http://localhost:3000/reports?page=${page}`)
            .then((response) => response.data)
            .then((data) => setReports(data))
            .catch((error) => history.push("/erro"));
        setLoading(false);
    }

    useEffect(() => {
        loadReports();
        loadTotalPages();
    }, [page])

    return (
        <div className="container-reports">
            <div className="header-reports"><Header backoffice={true} atual={5} /></div>
            <div className="content-reports">
                <div className="backoffice-reports">
                    <h2>BACKOFFICE</h2>
                    <h1>Denúncias</h1>
                    {loading ? (
                        <div className="list-reports-loading-cat"><LoadingCat /></div>
                    ) : (
                        <div className="container-table-reports">
                            <table className="all-reports">
                                <thead>
                                    <tr>
                                        <th>Nº</th>
                                        <th>Data</th>
                                        <th>Publicação</th>
                                        <th>Autor do comentário</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {reports.map((report) => 
                                    (
                                        <tr key={report.id}>
                                            <td>{report.id}</td>
                                            <td>{convertDate(report.created_at)}</td>
                                            <td><Link to={`/post/${223}`}>oi ignora isso</Link></td>
                                            <td>{"João da Quina Santos"}</td>
                                            <td><a onClick={() => deleteReport(report.id)} >Exibir</a></td>
                                        </tr>
                                    )
                                )}
                                                        
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="backoffice-footer-reports">
                        <div className="menu">
                            <Pagination actualPage={page+1} totalPages={totalPages} previous={() => prevPage()} next={() => nextPage()} specific={() => specificPage()} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-reports"><Footer /></div>
        </div>
    );
}