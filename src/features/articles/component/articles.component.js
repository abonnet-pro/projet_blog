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
                        <div key={ article.id } className="articleItem">
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
                                        <h2>{ article?.attributes.titre }</h2>
                                        <span className="badge rounded-pill bg-secondary me-2">{ article?.attributes.categorie.data?.attributes.titre }</span>
                                        <span className="badge rounded-pill bg-secondary">~{ getLectureTimeDisplay(article?.attributes.lignes) }</span>
                                    </div>
                                </Link>
                            </div>

                            <div className="card bg-light m-3 p-3">
                                <p className="elipsis m-0">{ article?.attributes.lignes }</p>
                            </div>

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

                        </div>
                )
                })
            }
        </>
    )
}