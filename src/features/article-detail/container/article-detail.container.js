import {useLocation} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ArticleDetail from "../component/article-detail.component";
import {ITEM_PER_PAGE, likeArticle, shareArticle} from "../../articles/service/articles.service";
import Commentaires from "../component/comment.component";
import {API} from "../../../utils/url.utils";
import CommentForm from "../component/comment-form.component";

export default function ArticleDetailContainer() {

    const navigate = useNavigate();
    const { state }  = useLocation();
    const [article, setArticle] = useState(state);
    const [comments, setComments] = useState([]);
    const [form, setForm] = useState({ comment: '' });

    const checkArticle = () => {
        if(!state) {
            navigate('/');
        }
    }

    const getComments = () => {
        fetch(`${API}/articles/${article?.id}?populate=commentaires.utilisateur`)
            .then(res => res.json())
            .then(data => setComments(data.data.attributes.commentaires.data))
            .catch(error => console.log(error))
    }

    const handleClickLike = (article) => {
        likeArticle(article, setArticle);
    }

    const handleClickShare = (article) => {
        shareArticle(article, setArticle);
    }

    useEffect(checkArticle, [state]);
    useEffect(getComments, [comments])

    return (
        <div className="m-10">
            <Link className="btn btn-primary" to="/">Retour</Link>
            <ArticleDetail article={ article } handleClickLike={ handleClickLike } handleClickShare={ handleClickShare }/>
            <Commentaires commentaires={ comments }/>
            <CommentForm form={ form } setForm={ setForm }/>
        </div>
    )
}