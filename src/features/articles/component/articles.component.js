import {API_IMAGE} from "../../../utils/url.utils";
import {getDiffDaysByNow} from "../../../utils/date.utils";
import {Link} from "react-router-dom";
import {getLectureTime} from "../service/articles.service";

export default function Articles({ articles }) {

    const optionsDate = { weekday: 'long', month: 'long', day: 'numeric' };

    function getDaysPosted(date) {
        let diffJours = getDiffDaysByNow(date);

        return Math.round(diffJours) > 0 ? `Il y a ${ Math.round(diffJours) } jours` : Math.round(diffJours) === 1 ? 'Hier' : 'Aujourd\'hui';
    }

    const getLectureTimeDisplay = (text) => {
        let timeSecond = getLectureTime(text)
        let heures = Math.floor(timeSecond / 3600);
        let minutes = Math.floor(timeSecond % 3600 / 60);
        let secondes = Math.floor(timeSecond % 3600 % 60);

        let hDisplay = heures > 0 ? heures + (heures === 1 ? " heure, " : " heures, ") : "";
        let mDisplay = minutes > 0 ? minutes + (minutes === 1 ? " minute, " : " minutes, ") : "";
        let sDisplay = secondes > 0 ? secondes + (secondes === 1 ? " seconde" : " secondes") : "";
        return hDisplay + mDisplay + sDisplay;
    }

    return (
        <>
            {
                articles.map(article => {
                    return (
                        <div key={ article.id } className="card mt-4 mb-4" >
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

                            <div className="card-body fw-bold"><i className="bi bi-clock"/> Temps de lecture : { getLectureTimeDisplay(article?.attributes.lignes) }</div>

                            <div className="card-body">
                                <p className="card-text">{ article?.attributes.lignes }</p>
                                <Link to='/article' state={ article } className="btn btn-primary">Ouvrir l'article</Link>
                            </div>
                            <div className="card-body">
                                <i data-bs-toggle="tooltip" data-bs-placement="top" title="like" className="bi bi-star pointer me-2 align-text-bottom"/><span className="me-4">0</span>
                                <i data-bs-toggle="tooltip" data-bs-placement="top" title="partage" className="bi bi-share pointer me-2 align-text-bottom"/><span>0</span>
                            </div>
                            <div className="card-footer text-muted">{ getDaysPosted(article?.attributes.createdAt) }</div>
                        </div>
                )
                })
            }
        </>
    )
}