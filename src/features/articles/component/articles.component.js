import {API_IMAGE} from "../../../utils/url.utils";
import {getDiffDaysByNow} from "../../../utils/date.utils";
import {Link} from "react-router-dom";
import {getLectureTimeDisplay, isArticleLiked, isArticleShared} from "../service/articles.service";
import {contextPrototype} from "../../../services/usersContext.service";

export default function Articles({ articles, handleClickLike, handleClickShare }) {

    const optionsDate = { weekday: 'long', month: 'long', day: 'numeric' };

    function getDaysPosted(date) {
        let diffJours = getDiffDaysByNow(date);

        return Math.round(diffJours) > 0 ? `Il y a ${ Math.round(diffJours) } jours` : Math.round(diffJours) === 1 ? 'Hier' : 'Aujourd\'hui';
    }

    const getArticleLiked = (article) => {
        return isArticleLiked(article) ? "red bi bi-suit-heart-fill" : "bi bi-suit-heart";
    }

    const getArticleShared = (article) => {
        return isArticleShared(article) ? "bi bi-share-fill" : "bi bi-share";
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
                                <p className="card-text elipsis">{ article?.attributes.lignes }</p>
                                <Link to='/article' state={ article } className="btn btn-primary">Ouvrir l'article</Link>
                            </div>

                            {
                                contextPrototype.user ?
                                    <div className="card-body">

                                        <i data-bs-toggle="tooltip" data-bs-placement="top" title="like"
                                           className={ "pointer me-2 align-text-bottom " + getArticleLiked(article) }
                                           onClick={ () => handleClickLike(article) }/>
                                        <span className="me-4">{ article?.attributes.likes.data.length }</span>

                                        <i data-bs-toggle="tooltip" data-bs-placement="top" title="partage"
                                           className={ "pointer me-2 align-text-bottom " + getArticleShared(article) }
                                           onClick={ () => handleClickShare(article) }/>
                                        <span className="me-4">{ article?.attributes.shares.data.length }</span>
                                    </div>
                                :
                                    null
                            }

                            <div className="card-footer text-muted">{ getDaysPosted(article?.attributes.createdAt) }</div>
                        </div>
                )
                })
            }
        </>
    )
}