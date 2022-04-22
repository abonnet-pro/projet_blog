import {API_IMAGE} from "../../../utils/url.utils";
import {getDiffDaysByNow} from "../../../utils/date.utils";

export default function Articles({ articles }) {

    const optionsDate = { weekday: 'long', month: 'long', day: 'numeric' };

    function getDaysPosted(date) {
        let diffJours = getDiffDaysByNow(date);

        return Math.round(diffJours) > 0 ? `Il y a ${ Math.round(diffJours) } jours` : Math.round(diffJours) === 1 ? 'Hier' : 'Aujourd\'hui';
    }

    return (
        <>
            {
                articles.map(article => {
                    return (
                        <div key={ article.id } className="card m-10">
                            <h3 className="card-header">{ article?.attributes.titre }</h3>
                            <div className="card-body container m-0">
                                <div className="row">
                                    <div className="col-1">
                                        <img className="image-article" src={ API_IMAGE + article?.attributes.image.data?.attributes.url } alt="Image introuvable"/>
                                    </div>
                                    <div className="col-11">
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
                            <div className="card-footer text-muted">{ getDaysPosted(article?.attributes.createdAt) }</div>
                        </div>
                )
                })
            }
        </>
    )
}