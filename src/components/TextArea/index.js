import { useState } from 'react';

import './styles.css';

export default function TextArea({ name="", textholder="", prevValue="", disabled=false, handleValue=null }){
    const [value, setValue] = useState(prevValue);

    const handleChange = (e) => {
        setValue(e);

        if(handleValue){
            handleValue(e);
        }
    }

    return (
        <div className="textarea">
            <label>{name}</label>
            <textarea placeholder={textholder} disabled={disabled}
            maxLength="1024"
            value={value}
            rows="4"
            col="50"
            onChange={e => handleChange(e.target.value)} />
        </div>
    );
}
