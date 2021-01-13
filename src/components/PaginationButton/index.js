import './styles.css';

export default function PaginationButton({ text, disabled=false, selected=false, onClick=null }){
    return (
        <div>
            {disabled ? (
                <div className="pagination-button disabled">{text}</div>
            ) : (
                selected ? (
                    <div className="pagination-button selected">{text}</div>
                ) : (
                    <div className="pagination-button enabled" onClick={onClick} >{text}</div>
                )
            )}
        </div>
    );
}