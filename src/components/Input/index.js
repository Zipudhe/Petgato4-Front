import { useState } from 'react';

import './styles.css';

export default function Input({ name, textholder, prevValue="", password=false, disabled=false, styles=0, handleValue=null }){
    const [value, setValue] = useState(prevValue);

    function handleChange(e) {
        setValue(e);

        if(handleValue){
            handleValue(e);
        }
    }

    return (
        <div className={styles === 0 ? ("input input-normal") : ("input input-large")}>
            <label>{name}</label>
            <input placeholder={textholder} disabled={disabled}
            type={password ? ("password") : ("text")}
            maxLength={styles === 0 ? ("32") : ("128")}
            value={value}
            onChange={e => handleChange(e.target.value)} />
        </div>
    );
}
