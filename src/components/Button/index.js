import React from 'react';

import style from './styles.css';

const Button = (props) => (
        <button type="submit" onClick={props.onClick} className={'btn btn' + props.style.toString()}>
            {props.children}
        </button>
);

export default Button;