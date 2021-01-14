import { useState } from 'react';

import './styles.css';

export default function Input({ name, textholder, prevValue="", password=false, disabled=false, styles=0, handleValue=null }){
    const [value, setValue] = useState(prevValue);

    function handleChange(e) {
        setValue(e);

        if(handleValue){
            handleValue(value);
        }
    }

    return (
        <div className="input">
            <label>{name}</label>
            <input placeholder={textholder} disabled={disabled}
            type={password ? ("password") : ("text")}
            maxLength="35"
            className={styles === 0 ? ("input-normal") : ("input-large")}
            value={value}
            onChange={e => handleChange(e.target.value)} />
        </div>
    );
}
