import {API_IMAGE} from "../../../utils/url.utils";
import {getDiffDaysByNow} from "../../../utils/date.utils";
import {Link} from "react-router-dom";
import {getLectureTimeDisplay, isArticleLiked, isArticleShared} from "../service/articles.service";

export default function Articles({ articles, handleClickLike, handleClickShare, profileAdmin, handleDeleteArticle, handleCheckArticles, accueilAdmin }) {

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

    const getNumberCommentAttente = (article) => {
        let number = 0;
        for(let comment of article.attributes.commentaires.data) {
            if(!comment.attributes.valide) {
                number++;
            }
        }
        return number;
    }

    return (
        <>
            {
                articles.length === 0 ? <div className="text-center text-primary">Aucun resultat</div> :
                articles.map(article => {
                    return (
                        <div key={ article.id } className="articleItem">
                            {
                                profileAdmin ? <input className="form-check-input checkDelete pointer" type="checkbox" value="" id="flexCheckDefault" onChange={ () => handleCheckArticles(article.id) }/> : null
                            }
                            <img width={700} height={270} className="articleImg" src={ API_IMAGE + article?.attributes.image.data?.attributes.url } alt="articlePicture"/>
                            <div className="previewInfo">
                                <div className="authorInfo">
                                    <img src={ API_IMAGE + '/uploads/user_748f99fb59.png' } alt="avatar"/>
                                    <div className="authorDescription">
                                        <span className="authorName">
                                            { article?.attributes.utilisateur.data?.attributes.username }
                                        </span>
                                        <span className="postDate">{ new Date(article?.attributes.createdAt).toLocaleDateString('fr-FR', optionsDate) } à { new Date(article?.attributes.createdAt).toLocaleTimeString() }</span>
                                    </div>
                                </div>
                                <Link to={`/article`} state={ article } className={'link'}>
                                    <div className="postInfoTitle">
                                        <h2>{ article?.attributes.titre } { accueilAdmin ? <span className="badge rounded-pill bg-secondary me-2">{ article?.attributes.categorie.data?.attributes.titre }</span> : null }</h2>
                                        {
                                            accueilAdmin ? null : <span className="badge rounded-pill bg-secondary me-2">{ article?.attributes.categorie.data?.attributes.titre }</span>
                                        }
                                        {
                                            accueilAdmin ? null : <span className="badge rounded-pill bg-secondary">~ { getLectureTimeDisplay(article?.attributes.lignes) }</span>
                                        }
                                    </div>
                                </Link>
                            </div>

                            {
                                accueilAdmin ? null :
                                    <div className="card bg-light m-3 p-3">
                                        <p className="elipsis m-0">{ article?.attributes.lignes }</p>
                                    </div>
                            }

                            {
                                accueilAdmin || profileAdmin ? null :
                                    <div className="postReactions">
                                        <div className="postReactionsInfo">

                                            <i data-bs-toggle="tooltip" data-bs-placement="top" title="like"
                                               className={ "postReactionsIcon " + getArticleLiked(article) }
                                               onClick={ () => handleClickLike(article) }/>
                                            <span>{ article?.attributes.likes.data.length } Likes</span>
                                        </div>
                                        <div className="postReactionsInfo">
                                            <i data-bs-toggle="tooltip" data-bs-placement="top" title="partage"
                                               className={ "postReactionsIcon " + getArticleShared(article) }
                                               onClick={ () => handleClickShare(article) }/>
                                            <span>{ article?.attributes.shares.data.length } Partages</span>
                                        </div>
                                    </div>
                            }
                            {
                                profileAdmin || accueilAdmin ?
                                    <div className="d-inline-flex m-3">
                                        {
                                            getNumberCommentAttente(article) > 0 ? <Link to="/profile/admin/commentaires" state={ true } className="editButton me-3 link">
                                                <i className="bi bi-card-text"/>En attente ({ getNumberCommentAttente(article) })</Link> : null
                                        }
                                        <Link to="/profile/admin/articles/new" state={ article } className="editButton me-3 link"><i
                                            className="bi bi-pencil-square"/>Modifier</Link>
                                        <button className="deleteButton me-3" onClick={ () => handleDeleteArticle(article.id) }>
                                            <i className="bi bi-trash"/>Supprimer</button>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                )
                })
            }
        </>
    )
}