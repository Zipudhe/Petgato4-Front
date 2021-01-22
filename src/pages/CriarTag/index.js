import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';
import { base_url } from '../../api';

export default function CriarTag(){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    let history = useHistory();

    function changeName(name) {
        setName(name);
    }

    function changeDescription(description) {
        setDescription(description);
    }

    const createTag = () => {
        if(name.length === 0){
            alert('O nome não pode ficar vazio!');
            return;
        }

        if(description.length === 0){
            alert('A descrição não pode estar vazia!');
            return;
        }

        axios.post(`${base_url}/tags/`, {
            name: name,
            description: description
        })
        .then(response => history.goBack())
        .catch(error => history.push('/erro'))
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