import React from 'react';

// eslint-disable-next-line no-unused-vars
import style from './styles.css';

const Button = (props) => (
        <button type="submit" onClick={props.onClick} className={'btn btn' + props.styles.toString()}>
            {props.children}
        </button>
);

export default Button;