import "./style.css";

export default function UserImage({source, size="lg"}){
    return(
        <img id="user-rounded" alt="user" src={source} className={size}></img>
    )
}