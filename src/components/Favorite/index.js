import React, { useState } from 'react';
import favorite_icon_enabled from '../../assets/awesome-heart.svg';
import favorite_icon_disabled from '../../assets/awesome-heart-1.svg';

import style from './styles.css';

const Favorite = ({ number=0, enabled=false }) => {
    return (
        <div className="container-favorite">
            <i></i>
        {enabled ? 
            <img className="favorite-icon" src={favorite_icon_enabled} alt="Favoritar" />
            :
            <img className="favorite-icon" src={favorite_icon_disabled} alt="Favoritar" />
        }
        <p className="favorite-number">{number}</p>
        </div>
    );
}

export default Favorite;