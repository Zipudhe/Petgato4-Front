import { useState } from 'react';

import './styles.css';
import search_icon from '../../assets/awesome-search.svg';

export default function SearchBar(){
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e);
        /*if(handleValue){
            handleValue(e);
        }*/
    }
    
    const submitSearch = () => {
        console.log(value);
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