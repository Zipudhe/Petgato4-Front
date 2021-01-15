import './styles.css';

export default function Comment({ author, text, date }){
    let user_image = 'https://capital95.com.br/wp-content/uploads/2020/08/baroes.jpg';
    
    if(text === ""){
        text = `Só basta você me ligar (aaaahhh), que eu vou correndo te encontrar!
        Brincadeiras a parte, ótimo post! Achei ótimo, também tenho um cachorro dessa raça
        e ele odeia fogos de artifício! O nome dele é Baroesa, porquê é uma cadela.
        E você chegou... Arrumadinha, mas tava linda... E a boca calou... E o coração se apaixonou...
        Éeee, e na hora que eu te beijei, foi melhor do que eu imaginei! Se eu soubesse tinha feito antes,
        no fundo sempre fomos bons amantes!
        `
    }
    
    return (
        <div className="comment">
            <div className="user-image">
                <div className="temp-image" styles={{ backgroundImage: `url(${user_image})`  }} >
                    
                </div>
            </div>

            <div className="content-comment">
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