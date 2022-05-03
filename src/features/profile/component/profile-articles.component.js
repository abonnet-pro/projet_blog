import ArticlesContainer from "../../articles/container/articles.container";

export default function ProfileArticles({ sort }) {
    return(
        <div>
            <ArticlesContainer sort={ sort } profileAdmin={ true }/>
        </div>
    )
}