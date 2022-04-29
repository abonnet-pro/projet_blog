import {API_IMAGE} from "../../../utils/url.utils";
import {isArticleLiked} from "../../articles/service/articles.service";
import {Link} from "react-router-dom";

export default function ArticlesRecent({ articles }) {

    const getArticleLiked = (article) => {
        return isArticleLiked(article) ? "red bi bi-suit-heart-fill" : "bi bi-suit-heart";
    }

    return(
        <div className="articles-recent">
            <div className="articles-recent-title">Articles récents</div>
                <div className="row mt-2 justify-content-center">
            {
                articles.map(article => {
                    return (
                        <div key={ article.id } className="card article-recent m-2 p-2">

                            <div>
                                <span className="badge rounded-pill bg-primary">{ article?.attributes.categorie.data?.attributes.titre }</span>
                            </div>

                            <div className="row mt-3">
                                <div className="col-3">
                                    <img className="image-article-recent" src={ API_IMAGE + article?.attributes.image.data?.attributes.url } alt="Image introuvable"/>
                                </div>
                                <div className="col-9">
                                    <h5>{ article?.attributes.titre }</h5>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <i data-bs-toggle="tooltip" data-bs-placement="top" title="like"
                                   className={ "align-text-bottom me-2 " + getArticleLiked(article) }/>
                                <span>{ article?.attributes.likes.data.length }</span>
                            </div>
                        </div>
                    )
                })
            }
                </div>
        </div>
    )
}