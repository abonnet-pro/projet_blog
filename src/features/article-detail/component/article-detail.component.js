import {API_IMAGE} from "../../../utils/url.utils";
import {isArticleLiked, isArticleShared} from "../../articles/service/articles.service";
import {Link} from "react-router-dom";

export default function ArticleDetail({ article, handleClickLike, handleClickShare }) {

    const optionsDate = { weekday: 'long', month: 'long', day: 'numeric' };

    const getArticleLiked = (article) => {
        return article && isArticleLiked(article) ? "red bi bi-suit-heart-fill" : "bi bi-suit-heart";
    }

    const getArticleShared = (article) => {
        return article && isArticleShared(article) ? "bi bi-share-fill" : "bi bi-share";
    }

    return(
        <div className="postWrapper">
            <div className="postInner">
                <Link to={'/'} className="link">
                    <button className="back">
                        <i className="bi bi-arrow-left"/>
                        <span>Accueil</span>
                    </button>
                </Link>
                <div className="postDescription">
                    <img src={ API_IMAGE + article?.attributes.image.data?.attributes.url } alt="postPicture"/>
                    <div className="postInfo">
                        <div className="author">
                            <img src={ API_IMAGE + '/uploads/user_748f99fb59.png' } alt="avatar"/>
                            <div className="authorDetails">
                                <span className="name">{ article?.attributes.utilisateur.data?.attributes.username }</span>
                                <span className="date">{ new Date(article?.attributes.createdAt).toLocaleDateString('fr-FR', optionsDate) } à { new Date(article?.attributes.createdAt).toLocaleTimeString() }</span>
                            </div>
                        </div>
                        <h1>{ article?.attributes.titre }</h1>
                        <span className="badge rounded-pill bg-secondary me-2">{ article?.attributes.categorie.data?.attributes.titre }</span>
                    </div>
                    <div className="postText" dangerouslySetInnerHTML={{__html: article?.attributes.lignes.replace(/\n/g,"<br />")}}/>
                    <div className="postActionsInfo">
                        <div className="postLike">
                            <i data-bs-toggle="tooltip" data-bs-placement="top" title="like"
                               className={ "postReactionsIcon " + getArticleLiked(article) }
                               onClick={ () => handleClickLike(article) }/>
                            <span>{ article?.attributes.likes.data.length } Likes</span>
                        </div>
                        <div className={'postLike'}>
                            <i data-bs-toggle="tooltip" data-bs-placement="top" title="partage"
                               className={ "postReactionsIcon " + getArticleShared(article) }
                               onClick={ () => handleClickShare(article) }/>
                            <span>{ article?.attributes.shares.data.length } Partages</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}