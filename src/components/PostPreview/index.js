import './styles.css';

import Tag from '../Tag';
import Favorite from '../Favorite';
import CommentIcon from '../CommentIcon';
import Views from '../Views';
import Button from '../Button';

import test from '../../assets/images/Login.jpg';

export default function PostPreview({post}){
    let tags = ["Cuidados", "Cães & Gatos", "Guias"];

    return (
        <div className="container-post">
            <div className="post-img">
                <img src={test} alt="Foto do post" />
            </div>
            <div className="post-content">
                <div className="tags">
                    <p>Tags:</p>
                    {tags.map((tag) => (
                        <Tag text={tag} key={tag} />)
                    )}
                </div>
                <div className="post-text">
                    <div className="post-title"><h1>{post.name}</h1></div>
                    <div className="post-description"><p>oi DANIELA porque voce esta lendo isso se isso nao vai te lefar a lugar nenhum, e so um teste de tamanho que eu to fazendo nao precisa ler ate o final serio vc so vai perder seu tempo aqui mano pode parar, nao tem nada de relevante daqui pra frente, e mesmo se tivesse nao valeria a  pena pq ta com muita enrolacao no inicio entao recomendo vc parar de ler, mas ja que chehgou ate auqi e insist, e so clicar em leia mais que voce vai ser redirecionada pra outra paina que contem o texto completo, sabe como e e como funciona esses sites de blogs e etcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetcetc</p></div>
                </div>
                <div className="post-footer">
                    <Button styles="1">LEIA MAIS</Button>
                    <div>
                        <Favorite number={0} />
                        <CommentIcon number={0} />
                        <Views number={0} />
                    </div>
                </div>
            </div>
        </div>
    );
}