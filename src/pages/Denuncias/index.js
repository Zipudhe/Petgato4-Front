import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import LoadingCat from '../../components/LoadingCat';
import { convertDate } from '../../functions';

import './styles.css';

export default function Users({ pageRef=0 }){
    const [page, setPage] = useState(pageRef);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [modalStatus, setModalStatus] = useState(false);
    const [reportValue, setReportValue] = useState('');
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
        if(page === 0){
            setPage(2);
        } else {
            setPage(page - 2);
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

    const loadReports = async () => {
        setLoading(true);
        axios.get(`http://localhost:3000/reports?page=${page}`)
            .then((response) => response.data)
            .then((data) => setReports(data))
            .catch((error) => history.push("/erro"));
        setLoading(false);
    }
    
    const showReport = (report = null) => {
        if(report){
            setReportValue(report);
        }
        
        setModalStatus(!modalStatus);
        
        document.body.style.overflow = modalStatus ? "visible" : "hidden";
    }

    const deleteReport = ( report_id ) => {
        axios.delete(`http://localhost:3000/reports/${report_id}?page=${page}`)
            .then((response) => setReports(response.data))
            .then(() => loadTotalPages(true))
            .then(() => showReport())
            .catch(error => history.push("/erro"));
    }

    const deleteComment = ( report_id, comment_id ) => {
        deleteReport(report_id);

        // verifica se é comentário ou resposta

        axios.delete(`http://localhost:3000/comments/${comment_id}?page=${page}`)
            .catch(error => history.push("/erro"));
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
                                            <td><Link to={`/post/${223}`}>Publicação</Link></td>
                                            <td>{"Autor do comentário"}</td>
                                            <td>
                                                <a onClick={() => showReport(report)}>Exibir</a>
                                                <div className={`container-modal ${modalStatus && "on"}`}>
                                                    <Modal styles={1} content={reportValue}
                                                    close={showReport}
                                                    deleteReport={deleteReport}
                                                    deleteComment={deleteComment} />
                                                </div>
                                            </td>
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