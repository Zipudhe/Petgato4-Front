import { useState } from 'react';

import './styles.css';

export default function TextArea({ name, textholder, prevValue="", disabled=false }){
    const [value, setValue] = useState(prevValue);

    return (
        <div className="textarea">
            <label>{name}</label>
            <textarea placeholder={textholder} disabled={disabled}
            maxLength="1024"
            value={value}
            rows="4"
            col="50"
            onChange={e => setValue(e.target.value)} />
        </div>
    );
}
