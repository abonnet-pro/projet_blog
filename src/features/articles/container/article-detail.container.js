import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import ArticleDetail from "../component/article-detail.component";

export default function ArticleDetailContainer() {

    const navigate = useNavigate();
    const { state }  = useLocation()

    const checkArticle = () => {
        if(!state) {
            navigate('/');
        }
    }

    useEffect(checkArticle, [state])

    return (
        <ArticleDetail article={ state }/>
    )
}