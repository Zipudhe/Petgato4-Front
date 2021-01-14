import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Input from '../../components/Input';

import "./styles.css";

const FaleConosco = () => (
    <div className="container-fale-conosco">
        <div><Header atual={3} /></div>
        <div className="container-enviar-mensagem">
            <div className="dog-image">a</div>

            <div className="user-info">
                <h2>FALE CONOSCO</h2>
                <h1>Envie-nos uma mensagem de cão-tato</h1>
                
                <div className="container-input">
                    <Input name="Nome" />
                    <Input name="Email" />
                </div>

                <div className="input-message">
                    <div className="message"><Input name="Mensagem" textholder="Digite aqui sua moew-sagem..." /></div>
                </div>

                <div className="container-button">
                    <Button styles={1} onClick={() => ( alert('ENVIAR') )}>ENVIAR</Button>
                </div>
            </div>
        </div>
        <div className="footer-fale-conosco"><Footer /></div>
    </div>
)

export default FaleConosco;