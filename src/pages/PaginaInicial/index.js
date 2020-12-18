import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PerfilHome from '../../components/PerfilHome';
import Post from '../../components/Post';

import './styles.css';

export default function PaginaInicial({page}){
    let posts = [1,2,3,4,5];
    
    return (
        <div>
            <Header />
            <div class="container-home-page">
                <div className="container-info">
                    <PerfilHome />
                </div>
                <div className="container-posts">
                    <h1>Miau!</h1>
                    <h2>Seja bem-vindo(a) ao blog PetGatô! Confira nosso conteúdo mais recente:</h2>
                    {posts.map(post => (
                        <Post />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}