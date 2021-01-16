import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LoadingCat from '../../components/LoadingCat';

import './styles.css';

export default function EditarTag(){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const location = useParams();

    function changeName(name) {
        setName(name);
    }

    function changeDescription(description) {
        setDescription(description);
    }

    const editTag = (id) => {
        axios.put(`http://localhost:3000/tags/${id}`, {
            name: name,
            description: description
        }).catch(error => console.error(error))
    }

    const loadTag = async (id) => {
        axios.get(`http://localhost:3000/tags/${id}`)
        .then(response => response.data)
        .then(data => {
            setName(data.name);
            setDescription(data.description);
        })
        .catch(error => alert('Essa tag não existe!'))
        setLoading(false);
    }

    useEffect(() => {
        loadTag(location.id);
    }, [])

    return (
        <div className="container-editar-tag">
            <Header />

            {name.length === 0 || description.length === 0 ? ( 
                <LoadingCat />
            ) : (
                <div className="backoffice-editar-tag">
                    <h2>BACKOFFICE</h2>
                    <h1>Nova Tag</h1>
                    <Input name={"Nome da Tag"} styles={1} prevValue={name} handleValue={changeName} />
                    <Input name={"Descrição da Tag"} styles={1} prevValue={description} handleValue={changeDescription} />

                    <div className="container-buttons">
                        <Button onClick={() => editTag(location.id)} styles="3">SALVAR</Button>
                        <Link to="/tags"><Button styles="1">VOLTAR</Button></Link>
                    </div>
                </div>
            )}

            <div className="footer-editar-tag"><Footer /></div>
        </div>
    );
}