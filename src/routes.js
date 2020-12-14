import React from 'react';

import { Router } from "@reach/router";

import Cadastro from "./pages/Cadastro";
import Recover from "./pages/recover";
import PageLogin from './pages/login';
import App from "./App";

const Routes = () => (
    <Router>
        <App path="/" />
        <Cadastro path="/signIn" />
        <Recover path="/recover" />
        <PageLogin path="/login"/>
    </Router>
);

export default Routes