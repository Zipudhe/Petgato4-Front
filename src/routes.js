import { useState } from 'react';
import { isAuthenticated, isAdmin } from './auth'; 

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import PaginaInicial from './pages/PaginaInicial';
import Cadastro from './pages/Cadastro';
import FaleConosco from './pages/FaleConosco';
import PaginaErro from './pages/PaginaErro';
import Sobre from './pages/Sobre';
import Login from './pages/Login';
import RecuperarSenha from './pages/RecuperarSenha';
import PaginaPublicacao from './pages/PaginaPublicacao';

import EditarPerfil from './pages/EditarPerfil';
import EditUser from './pages/EditUser';
import Mensagens from './pages/Mensagens';

import Denuncias from './pages/Denuncias';
import CriarTag from './pages/CriarTag';
import EditarTag from './pages/EditarTag';
import Publicacoes from './pages/Publicacoes';
import CriarPublicacao from './pages/CriarPublicacao';
import EditarPublicacao from './pages/EditarPublicacao';
import Tags from './pages/Tags';
import Usuarios from './pages/Usuarios';

const PrivateRoute = ({ component: Component, ... rest}) => {
    const [logged, setLogged] = useState(isAuthenticated().then(response => setLogged(response)));
    
    return (
        <Route { ... rest} render={props => (
            logged ? (
                <Component { ... props} />
            ) : (
                <Redirect to={{ pathname: '/nao-permitido', state: { from: props.location } }} />
            )
        )} />
    );
}

const AdminRoute = ({ component: Component, ... rest}) => {
    const [logged, setLogged] = useState(isAuthenticated().then(response => setLogged(response)));
    const [admin, setAdmin] = useState(isAdmin().then(response => setAdmin(response)));
    
    return (
        <Route { ... rest} render={props => (
            logged && admin ? (
                <Component { ... props} />
            ) : (
                <Redirect to={{ pathname: '/nao-permitido', state: { from: props.location } }} />
            )
        )} />
    );
}

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={() => <PaginaInicial />} />
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/cadastro" component={() => <Cadastro />} />
            <Route exact path="/recuperar-senha" component={() => <RecuperarSenha />} />
            <Route exact path="/sobre" component={() => <Sobre />} />
            <Route exact path="/contato" component={() => <FaleConosco />} />
            <Route exact path="/nao-permitido" component={() => <PaginaErro error={1} />} />
            <Route exact path="/nao-encontrada" component={() => <PaginaErro error={2} />} />
            <Route exact path="/post/:id" component={() => <PaginaPublicacao />} />
            
            <Route exact path="/erro" component={() => <PaginaErro />} />
            <Route exact path="/teste" component={() => <PaginaPublicacao />} />

            <PrivateRoute exact path="/editar-perfil" component={() => <EditarPerfil />} />

            <AdminRoute exact path="/denuncias" component={() => <Denuncias />} />
            <AdminRoute exact path="/publicacoes" component={() => <Publicacoes />} />
            <AdminRoute exact path="/criar-publicacao" component={() => <CriarPublicacao />} />
            <AdminRoute exact path="/editar-publicacao/:id" component={() => <EditarPublicacao />} />
            <AdminRoute exact path="/usuarios" component={() => <Usuarios />} />
            <AdminRoute exact path="/tags" component={() => <Tags />} />
            <AdminRoute exact path="/criar-tag" component={() => <CriarTag />} />
            <AdminRoute exact path="/editar-tag/:id" component={() => <EditarTag />} />
            <AdminRoute exact path="/editar-usuario" component={() => <EditUser />} />
            <AdminRoute exact path="/mensagens" component={() => <Mensagens />} />

            <Route path="/" component={() => <PaginaErro error={2} />} />
        </Switch>
    </BrowserRouter>
);

export default Routes;