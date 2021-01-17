import './styles.css';

export default function Comment({ author, text, date }){
    if(text === ""){
        text = `Discordo. Se ela quiser, só fé, se não quiser já é.
        `
    }
    
    return (
        <div className="reply">
            <div className="user-image">
                <div className="temp-image"></div>
            </div>
            <div className="content-reply">
                <div className="title">
                    <h2>{author}</h2>
                    <a>icon</a>
                </div>
                <i>{date}</i>
                <p>{text}</p>
            </div>
        </div>
    );
}