import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import logo_petgato from '../../assets/images/gatinho_petgato.svg';

import './styles.css';

const Cadastro = () => (
    <div className="container-cadastro">
        <div className="container-img"></div>
        <div className="content-cadastro">

            <Link to="/"><img className="logo-petgato" src={logo_petgato} alt="Logo Petgatô" /></Link>
            <div className="container-input">
                <Input name="Nome"/>
                <Input name="Email"/>
                <Input name="Senha" password={true} />
                <Input name="Confirme sua senha" password={true} />
            </div>

            <Button onClick={() => alert('CADASTRAR')} styles="3">CADASTRAR</Button>

            <p>Já possui conta? <Link to="/login"><a>Faça login</a></Link></p>
        </div>
    </div>
);

export default Cadastro;