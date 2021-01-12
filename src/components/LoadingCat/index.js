import './styles.css';

import loading_cat from '../../assets/loading_cat.gif';

export default function LoadingCat(){
    return (
        <div className="loading-cat">
            <img src={loading_cat} />
        </div> 
    );
};