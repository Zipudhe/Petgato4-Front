import React from 'react';

import { Router } from "@reach/router";

import Cadastro from "./pages/Cadastro";
import Recover from "./pages/recover";
import App from "./App";

const Routes = () => (
    <Router>
        <App path="/" />
        <Cadastro path="/signIn" />
        <Recover path="/recover" />
    </Router>
);

export default Routes