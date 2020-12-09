import "./style.css";

export default function SpanText({text, link, path}){
    return(
    <p className="texto">{text}<a href={path} className="link">{link}</a></p>
    )
}
