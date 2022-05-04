import ArticlesContainer from "../../articles/container/articles.container";
import {useEffect} from "react";

export default function ProfileArticles({ sort, setArticlesSelected }) {

    const init = () => {
        setArticlesSelected(true);
    }

    useEffect(init, []);

    return(
        <div>
            <ArticlesContainer sort={ sort } profileAdmin={ true } accueilAdmin={ true }/>
        </div>
    )
}