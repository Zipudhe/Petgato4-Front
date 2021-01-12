import './style.css';

export default function Input({name, disabled=false, textholder, inputId}){
    return (
        <div className="input">
            <label className="form-label" htmlFor="{inputId}" >{name}</label>
            <input placeholder={textholder} disabled={disabled} id={inputId} className="form-input"/>
        </div>
    );
}
