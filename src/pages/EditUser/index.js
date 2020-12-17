import './style.css';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';


export default function EditUser(){
    return(
        <>
        <Header/>
        <div className="edit-user">
            <p className="backoffice">BACKOFFICE</p>
            <p className="edit-title">Editar Usuário</p>
            <div className="edit-inputs">
                <Input name="Nome"/>
                <Input name="Email" disabled textholder="email@email.com"/>
                <div className="role-selector">
                <label id="user-role-label" for="user-role">Tipo de usuário</label>
                <select id="user-role" name="rolelist">
                <option value="comum">Comun</option>
                <option value="admin">Administrador</option>
                </select>
                </div>
                <Input name="Data de ingresso" disabled textholder="22/12/2020"/>
                <div className="edit-buttons">
                    <div className="save-button">
                        <Button styles="3">SALVAR</Button>
                    </div>
                    <div className="return-button">
                        <Button styles="1">VOLTAR</Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}