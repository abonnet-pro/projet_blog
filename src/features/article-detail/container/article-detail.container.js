import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ArticleDetail from "../component/article-detail.component";
import {likeArticle, shareArticle} from "../../articles/service/articles.service";
import Commentaires from "../component/comment.component";
import {API} from "../../../utils/url.utils";
import CommentForm from "../component/comment-form.component";
import {contextPrototype} from "../../../services/usersContext.service";
import {toast} from "react-toastify";
import ArticlesRecent from "../component/articles-recent.component";
import {headerToken, token} from "../../../services/http.service";

export default function ArticleDetailContainer() {

    const navigate = useNavigate();
    const { state }  = useLocation();
    const [article, setArticle] = useState(state);
    const [comments, setComments] = useState([]);
    const [form, setForm] = useState({ comment: '' });
    const [recentArticles, setRecentArticles] = useState([]);

    const checkArticle = () => {
        if(!state) {
            navigate('/');
        }
    }

    const getComments = () => {
        if(!article) {
            return;
        }

        fetch(`${API}/articles/${article?.id}?populate=commentaires.utilisateur`, headerToken)
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

    const handleSubmitFormComment = (event) => {
        event.preventDefault();

        const body = {
            lignes: form.comment,
            article: article.id,
            utilisateur: contextPrototype.userSave.id
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization' : 'bearer ' + token() },
            body: JSON.stringify({ data: body })
        };

        fetch(`http://localhost:1337/api/commentaires`, requestOptions)
            .then(res => res.json())
            .then(data => {
                toast.success("Commentaire envoyé, en attente de validation", {
                    theme: "colored"
                });
                setForm({comment: ''})
                getComments()
            })
            .catch(error => console.log(error));
    }

    const getRecentArticles = () => {
        fetch(`${API}/articles?populate=*&pagination[pageSize]=5&sort[0]=createdAt%3Adesc`, headerToken)
            .then(res => res.json())
            .then(data => {
                setRecentArticles(data.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(checkArticle, [state]);
    useEffect(getComments, []);
    useEffect(getRecentArticles, []);

    return (
        <div>
            <ArticleDetail article={ article } handleClickLike={ handleClickLike } handleClickShare={ handleClickShare }/>
            <Commentaires commentaires={ comments }/>
            {
                contextPrototype.user ? <CommentForm form={ form } setForm={ setForm } handleSubmitFormComment={ handleSubmitFormComment }/> : null
            }
            <ArticlesRecent articles={ recentArticles }/>
        </div>
    )
}