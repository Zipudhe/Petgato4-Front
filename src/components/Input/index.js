import './style.css';

export default function Input({name, disabled=false, textholder}){
    return (
        <div className="input">
            <label id="form-label" for="form-input">{name}</label><br></br>
            <input placeholder={textholder} disabled={disabled} id="form-input"/>
        </div>
    )
}