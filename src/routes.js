import React from 'react';

import { Router } from "@reach/router";

import Cadastro from "./pages/Cadastro";
import Recover from "./pages/recover";
import PageLogin from './pages/login';
import PaginaInicial from './pages/PaginaInicial';
import EditUser from './pages/EditUser';
import FaleConosco from './pages/FaleConosco';
import EditarTag from './pages/EditarTag';
import Publicacoes from './pages/Publicacoes';
import Sobre from './pages/Sobre';
import EditarPerfil from './pages/EditarPerfil';

const Routes = () => (
    <Router>
        <PaginaInicial path="/" />
        <Cadastro path="/signUp" />
        <Recover path="/recover" />
        <PageLogin path="/login"/>
        <CriarTag path="/backoffice/create_tags"/>
        <Denuncias path="/backoffice/denuncias"/>
        <EditUser path="/backoffice/edituser"/>
        <EditarTag path="/backoffice/edit_tags"/>
        <FaleConosco path="/contato"/>
        <Publicacoes page="0" path="/backoffice/pubclicacoes"/>
        <Sobre path="/sobre"/>
        <EditaPerfil path="/backoffice/perfil"/>
    </Router>
);

export default Routes