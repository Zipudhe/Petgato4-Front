import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';

export default function CriarTag(){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function changeName(name) {
        setName(name);
    }

    function changeDescription(description) {
        setDescription(description);
    }

    const createTag = () => {
        axios.post(`http://localhost:3000/tags/`, {
            name: name,
            description: description
        }).catch(error => console.error(error))
    }

    return (
        <div className="container-criar-tag">
            <Header />
            <div className="backoffice-criar-tag">
                <h2>BACKOFFICE</h2>
                <h1>Nova Tag</h1>
                <Input name={"Nome da Tag"} styles={1} handleValue={changeName} />
                <Input name={"Descrição da Tag"} styles={1} handleValue={changeDescription} />

                <div className="container-buttons">
                    <Button onClick={createTag} styles="3">SALVAR</Button>
                    <Link to="/tags"><Button styles="1">VOLTAR</Button></Link>
                </div>
            </div>
            <div className="footer-criar-tag"><Footer /></div>
        </div>
    );
}