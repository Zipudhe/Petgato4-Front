import './styles.css';
import close_icon from '../../assets/close_icon.svg';

export default function Modal({ content, close, styles=0 }){
    // fecha modal ao clicar fora da div
    const verifyClick = (target) => {
        if(target.className === 'modal'){
            close();
        }
    }

    return (
        <div className="modal" onClick={e => verifyClick(e.target)}>
            <div className="box-modal">
                <div className="header-modal">
                    <h2 className="a">Mensagem: {content.name}</h2>
                    <img src={close_icon} onClick={close} alt="Fechar" />
                </div>

                <div className="content-modal">
                    <p><b>Email:</b> {content.email}</p>
                    <p><b>Mensagem:</b></p>
                    <p>{content.description}</p>
                </div>

            </div>
        </div>
    )
}