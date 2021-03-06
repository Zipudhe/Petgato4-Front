import favorite_icon_enabled from '../../assets/awesome-heart.svg';
import favorite_icon_disabled from '../../assets/awesome-heart-1.svg';

import './styles.css';

const Favorite = ({ number=0, enabled=false }) => {
    return (
        <div className="container-favorite">
            <i></i>
        {enabled ? 
            <img className="favorite-icon" src={favorite_icon_enabled} alt="Favoritados" />
            :
            <img className="favorite-icon" src={favorite_icon_disabled} alt="Favoritados" />
        }
        <p className="favorite-number">{number}</p>
        </div>
    );
}

export default Favorite;