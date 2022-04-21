import Articles from "../component/articles.component";
import {useEffect, useState} from "react";
import {API} from "../../../utils/url.utils";

export default function ArticlesContainer() {

    const [articles, setArticles] = useState([]);

    const callApi = () => {
        fetch(`${API}/articles?populate=*`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setArticles(data.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(callApi, []);

    return (
        <Articles articles={ articles }/>
    )
}