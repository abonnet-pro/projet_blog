import {API_IMAGE} from "../../../utils/url.utils";

export default function ArticleDetail({ article }) {

    const optionsDate = { weekday: 'long', month: 'long', day: 'numeric' };

    return(
        <div className="card mt-4 mb-4" >
            <h3 className="card-header">{ article?.attributes.titre } <span className="badge rounded-pill bg-primary">{ article?.attributes.categorie.data?.attributes.titre }</span></h3>
            <div className="card-body container m-0">
                <div className="row">
                    <div className="col-1">
                        <img className="image-article" src={ API_IMAGE + article?.attributes.image.data?.attributes.url } alt="Image introuvable"/>
                    </div>
                    <div className="col-11 w-auto">
                        <h5 className="card-title">Publié par : { article?.attributes.utilisateur.data?.attributes.username } </h5>
                        <h6 className="card-subtitle text-muted">{ new Date(article?.attributes.createdAt).toLocaleDateString('fr-FR', optionsDate) } à { new Date(article?.attributes.createdAt).toLocaleTimeString() }</h6>
                    </div>
                </div>
            </div>

            <div className="card-body">
                <p className="card-text">{ article?.attributes.lignes }</p>
            </div>
            <div className="card-body">
                <i data-bs-toggle="tooltip" data-bs-placement="top" title="like" className="bi bi-star pointer me-3"/>
                <i data-bs-toggle="tooltip" data-bs-placement="top" title="partage" className="bi bi-share pointer"/>
            </div>
        </div>
    )
}