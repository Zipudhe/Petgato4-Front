import './styles.css';
import close_icon from '../../assets/close_icon.svg';

export default function Modal({ content, close, styles=0 }){
    // style === 0 ? denúncia : mensagem
    return (
        <div className="modal">
            <div className="box-modal">
                <div className="header-modal">
                    <img src={close_icon} onClick={close} />
                    <h2>Mensagem: </h2>
                </div>

                <div className="content-modal">
                    <p><b>Email:</b> {content.email}</p>
                    <p><b>Mensagem:</b></p>
                    <p>{content.description} nao passa pro lado aaaaa</p>
                </div>

            </div>
        </div>
    )
}