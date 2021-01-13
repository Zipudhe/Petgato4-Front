import React from 'react';
import { isAuthenticated, isAdmin } from './auth'; 

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import PaginaInicial from './pages/PaginaInicial';
import Cadastro from './pages/Cadastro';
import FaleConosco from './pages/FaleConosco';
import PaginaErro from './pages/PaginaErro';
import Sobre from './pages/Sobre';

import EditarPerfil from './pages/EditarPerfil';
import EditUser from './pages/EditUser';
import Mensagens from './pages/Mensagens';

import Denuncias from './pages/Denuncias';
import CriarTag from './pages/CriarTag';
import EditarTag from './pages/EditarTag';
import Publicacoes from './pages/Publicacoes';
//import EditarPublicacoes from './pages/EditarPublicacoes';
import Tags from './pages/Tags';
import Usuarios from './pages/Usuarios';

import Login from './pages/login';
import Recover from './pages/recover';

const PrivateRoute = ({ component: Component, ... rest}) => (
    <Route { ... rest} render={props => (
        isAuthenticated() ? (
            <Component { ... props} />
        ) : (
            <Redirect to={{ pathname: '/nao-permitido', state: { from: props.location } }} />
        )
    )} />
);

const AdminRoute = ({ component: Component, ... rest}) => (
    <Route { ... rest} render={props => (
        isAdmin() ? (
            <Component { ... props} />
        ) : (
            <Redirect to={{ pathname: '/nao-permitido', state: { from: props.location } }} />
        )
    )} />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={() => <PaginaInicial />} />
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/cadastro" component={() => <Cadastro />} />
            <Route exact path="/recuperar-senha" component={() => <Recover />} />
            <Route exact path="/sobre" component={() => <Sobre />} />
            <Route exact path="/contato" component={() => <FaleConosco />} />
            <Route exact path="/nao-permitido" component={() => <PaginaErro error={1} />} />
            <Route exact path="/nao-encontrada" component={() => <PaginaErro error={2} />} />
            <Route exact path="/erro" component={() => <PaginaErro />} />
            
            <PrivateRoute exact path="/editar-perfil" component={() => <EditarPerfil />} />

            <AdminRoute exact path="/denuncias" component={() => <Denuncias />} />
            <AdminRoute exact path="/publicacoes" component={() => <Publicacoes />} />
            <AdminRoute exact path="/usuarios" component={() => <Usuarios />} />
            <AdminRoute exact path="/tags" component={() => <Tags />} />
            <AdminRoute exact path="/criar-tag" component={() => <CriarTag />} />
            <AdminRoute exact path="/editar-tag" component={() => <EditarTag />} />
            <AdminRoute exact path="/editar-usuario" component={() => <EditUser />} />
            <AdminRoute exact path="/mensagens" component={() => <Mensagens />} />

            <Route path="/" component={() => <PaginaErro error={2} />} />
        </Switch>
    </BrowserRouter>
);

export default Routes;