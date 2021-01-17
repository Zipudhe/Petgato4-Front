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

export default function Mensagens({ pageRef=0 }){
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(pageRef);
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [modalStatus, setModalStatus] = useState(false);
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

    const showMessage = () => {
        setModalStatus(!modalStatus);

        document.body.style.overflow = modalStatus ? "hidden" : "visible";
    }

    function loadTotalPages( deleted=false ) {
        axios.get(`http://localhost:3000/countmessages/`)
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

    const deleteMessage = (id) => {
        if(window.confirm("Tem certeza?")){
            axios.delete(`http://localhost:3000/messages/${id}?page=${page}`)
                .then((response) => response.data)
                .then((data) => setMessages(data))
                .then(() => loadTotalPages(true))
                .catch((error) => history.push("/erro"));
        }
    }

    const loadMessages = async () => {
        setLoading(true);
        axios.get(`http://localhost:3000/messages?page=${page}`)
            .then((response) => response.data)
            .then((data) => setMessages(data))
            .catch((error) => history.push("/erro"));
        setLoading(false);
    }

    useEffect(() => {
        loadMessages();
        loadTotalPages();
    }, [])

    useEffect(() => {}, [modalStatus])

    return (
        <div className="container-messages">
            <Header backoffice={true} atual={6} />
            <div className="content-messages">
                <div className="backoffice-messages">
                    <h2>BACKOFFICE</h2>
                    <h1>Mensagens de Contato</h1>
                    {messages.length === 0 || loading ? (
                        <div className="list-messages-loading-cat"><LoadingCat /></div>
                    ) : (
                        <div className="container-table-messages">
                            <table className="all-messages">
                                <thead>
                                    <tr>
                                        <th>Remetente</th>
                                        <th>Descrição</th>
                                        <th>Data de Envio</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map((message) => 
                                        (
                                            <tr key={message.id}>
                                                <td>{message.name}</td>
                                                <td>"{message.description}"</td>
                                                <td>{convertDate(message.created_at)}</td>
                                                <td><a onClick={() => showMessage()}>Exibir</a></td>
                                                <td><a onClick={() => deleteMessage(message.id)}>Excluir</a></td>
                                                
                                                <div className={`container-modal ${modalStatus && "on"}`}>
                                                    <Modal styles={1} content={message} close={showMessage} />
                                                </div>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="backoffice-footer-messages">
                        <div className="menu">
                            <Pagination actualPage={page+1} totalPages={totalPages} previous={() => prevPage()} next={() => nextPage()} specific={() => specificPage()} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-messages"><Footer /></div>
        </div>
    );
}