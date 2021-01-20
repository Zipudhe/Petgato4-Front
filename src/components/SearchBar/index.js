import { useState } from 'react';

import './styles.css';
import search_icon from '../../assets/awesome-search.svg';

export default function SearchBar({ handleValue=null, handleSubmit=null }){
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e);

        if(handleValue){
            handleValue(e);
        }
    }
    
    const submitSearch = () => {
        if(handleSubmit){
            console.log(value);
            handleSubmit(value);
        }
    }

    return (
        <div className="search-bar">
            <input type="text"
            value={value}
            onChange={e => handleChange(e.target.value)}
            maxLength="64" />
            <img src={search_icon} onClick={() => submitSearch()} />
        </div>
    );
}