import {Link} from "react-router-dom";

export default function Infos() {
    return (
        <div className="row infos">

            <Link to={'/'} className="link">
                <button className="back">
                    <i className="bi bi-arrow-left"/>
                    <span>Accueil</span>
                </button>
            </Link>

            <img className="image-infos col-8" src="https://alinoa.be/wp-content/uploads/2019/10/000-2019-blog-creer-un-blog-3-780x780.jpg"/>

            <div className="col-4 text-center m-5">
                <h2 className="mb-5">C'est quoi ce blog ?</h2>
                <p>
                    Salut bande de rédacteurs web de tout horizons !
                </p>
                <p>
                    Voici le blog pour les bloggers !
                </p>
                <p>
                    Blogger, c'est à dire spécialiste en blog
                </p>
                <p>
                    Donc sur ce blog, vous apprendrez :
                </p>
                <ul >
                    <li className="list-group-item bg-secondary">
                        A écrire, mieux, plus, différement, avec votre coeur
                    </li>
                    <li className="list-group-item bg-secondary">
                        A vous vendre. A votre véritable valeur.
                    </li>
                    <li className="list-group-item bg-secondary">
                        A être motivé. Et inspiré
                    </li>
                    <li className="list-group-item bg-secondary">
                        A mieux gérer votre business de rédac, et donc votre temps !
                    </li>
                </ul>
            </div>
        </div>
    )
}