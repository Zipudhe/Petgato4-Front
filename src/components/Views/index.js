import './styles.css';
import eye_icon from '../../assets/awesome-eye.svg';

const Views = ({ number=0 }) => {
    return (
        <div className="container-views-icon">
            <img className="views-icon" src={eye_icon} alt="Visualizações" />
            <p className="views-number">{number}</p>
        </div>
    );
}

export default Views;