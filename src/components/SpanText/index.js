import "./style.css";
import { Link } from "@reach/router";

export default function SpanText({text, link, path}){
    return(
    <p className="texto">{text}<Link to={path} className="link">{link}</Link></p>
    )
}
