import './style.css';

export default function Input({name, disabled=false, textholder}){
    return (
        <div className="input">
            <label id="form-label" htmlFor="form-input">{name}</label>
            <input placeholder={textholder} disabled={disabled} id="form-input"/>
        </div>
    )
}