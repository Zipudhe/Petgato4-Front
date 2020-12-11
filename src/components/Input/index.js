import './style.css';

export default function Input({name, disabled=false, textholder}){
    return (
        <div className="input">
            <label className="form-label">{name}</label>
            <input placeholder={textholder} disabled={disabled} className="form-input"/>
        </div>
    )
}