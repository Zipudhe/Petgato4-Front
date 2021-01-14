import { useState } from 'react';

import './style.css';

export default function Input({ name, textholder, prevValue="", password=false, disabled=false, styles=1 }){
    const [value, setValue] = useState(prevValue);

    return (
        <div className="input">
            <label>{name}</label>
            <input placeholder={textholder} disabled={disabled}
            type={password ? ("password") : ("text")}
            maxLength="25"
            value={value}
            onChange={e => setValue(e.target.value)} />
        </div>
    );
}
