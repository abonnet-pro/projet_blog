import {useEffect} from "react";
import Articles from "../../articles/component/articles.component";

export default function ProfileAccueil({ accueilSelected, callApi, articles, setAccueilSelected }) {

    const init = () => {
        setAccueilSelected(true);
        callApi()
    }

    useEffect(init, [accueilSelected]);

    return(
        <div>
            <h1 className="mb-4 mt-4 text-primary">Articles récents</h1>
           <Articles articles={ articles.slice(0, 5) } accueilAdmin={ true }/>
        </div>
    )
}