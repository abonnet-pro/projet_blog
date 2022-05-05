import {Link} from "react-router-dom";
import {useState} from "react";

export default function ProfileSidebar(
    { setFilter, setSort, accueilSelected, setAccueilSelected, articlesSelected, setArticlesSelected, commentairesSelected, setCommentairesSelected, sortAttenteSelect, setSortAttenteSelect, sortInvalideSelect, setSortInvalideSelect, sortValideSelect, setSortValideSelect }) {

    const [sortAuteurDesc, setSortAuteurDesc] = useState(true);
    const [sortDateDesc, setSortDateDesc] = useState(true);
    const [sortTitreDesc, setSortTitreDesc] = useState(true);

    const [sortDateSelect, setSortDateSelect] = useState(false);
    const [sortTitreSelect, setSortTitreSelect] = useState(false);
    const [sortAuteurSelect, setSortAuteurSelect] = useState(false);

    const sortAuteur = () => {
        setSortAuteurDesc(!sortAuteurDesc);
        setSortDateDesc(true);
        setSortTitreDesc(true);

        setSortAuteurSelect(true);
        setSortTitreSelect(false);
        setSortDateSelect(false);

        let sort = sortAuteurDesc ? '&sort[0]=utilisateur.username%3Adesc' : '&sort[0]=utilisateur.username';
        setSort(sort);
    }

    const sortDate = () => {
        setSortDateDesc(!sortDateDesc);
        setSortAuteurDesc(true);
        setSortTitreDesc(true);

        setSortAuteurSelect(false);
        setSortTitreSelect(false);
        setSortDateSelect(true);

        let sort = sortDateDesc ? '&sort[1]=createdAt' : '&sort[1]=createdAt%3Adesc';
        setSort(sort);
    }

    const sortTitre = () => {
        setSortTitreDesc(!sortTitreDesc);
        setSortAuteurDesc(true);
        setSortDateDesc(true);

        setSortAuteurSelect(false);
        setSortTitreSelect(true);
        setSortDateSelect(false);

        let sort = sortTitreDesc ? '&sort[2]=titre%3Adesc' : '&sort[2]=titre';
        setSort(sort);
    }

    const sortAttente = () => {
        setSortAttenteSelect(!sortAttenteSelect);
        setSortValideSelect(false);
        setSortInvalideSelect(false);

        // let filter = sortAttenteSelect ? '' : '&filters[commentaires][attente][$eq]=true';
        // setFilter(filter);
    }

    const sortValide = () => {
        setSortAttenteSelect(false);
        setSortValideSelect(!sortValideSelect);
        setSortInvalideSelect(false);
        //
        // let filter = sortValideSelect ? '' : '&filters[commentaires][valide][$eq]=true';
        // setFilter(filter);
    }

    const sortInvalide = () => {
        setSortAttenteSelect(false);
        setSortValideSelect(false);
        setSortInvalideSelect(!sortInvalideSelect);

        // let filter = sortInvalideSelect ? '' :'&filters[$and][0][commentaires][valide][$eq]=false&filters[$and][1][commentaires][attente][$eq]=false';
        // setFilter(filter);
    }

    const handleAccueil = () => {
        setAccueilSelected(true);
        setArticlesSelected(false);
        setCommentairesSelected(false);
    }

    const handleArticles = () => {
        setAccueilSelected(false);
        setArticlesSelected(true);
        setCommentairesSelected(false);
    }

    const handleCommentaires = () => {
        setAccueilSelected(false);
        setArticlesSelected(false);
        setCommentairesSelected(true);
    }

    return(
        <div className="sidebar">

            {
                commentairesSelected ?
                    <div className="menu">

                        <h4>Filtrer par</h4>
                        <ul>
                            <li className={ sortAttenteSelect ? "sidebarItemOpen" : "sidebarItem" } onClick={ sortAttente }>
                                <i className="bi bi-hourglass-split"/>
                                <span>En attente</span>
                            </li>
                            <li  className={ sortValideSelect ? "sidebarItemOpen" : "sidebarItem" } onClick={ sortValide }>
                                <i className="bi bi-check-circle"/>
                                <span>Valide</span>
                            </li>
                            <li className={ sortInvalideSelect ? "sidebarItemOpen" : "sidebarItem" } onClick={ sortInvalide }>
                                <i className="bi bi-x-circle"/>
                                <span>Invalide</span>
                            </li>
                        </ul>
                    </div>
                    : null
            }
            {
                articlesSelected ?
                <div className="menu">

                    <h4>Trier par</h4>
                    <ul>
                        <li className={ sortDateSelect ? "sidebarItemOpen" : "sidebarItem" } onClick={ sortDate }>
                            <i className="bi bi-clock align-baseline"/>
                            <span>Date</span>
                            {
                                sortDateDesc ? <i className="bi bi-arrow-down-short me-3 align-bottom"/> : <i className="bi bi-arrow-up-short me-3 align-bottom"/>
                            }
                        </li>
                        <li  className={ sortTitreSelect ? "sidebarItemOpen" : "sidebarItem" } onClick={ sortTitre }>
                            <i className="bi bi-hash align-baseline"/>
                            <span>Titre</span>
                            {
                                sortTitreDesc ? <i className="bi bi-arrow-down-short me-3 align-bottom"/> : <i className="bi bi-arrow-up-short me-3 align-bottom"/>
                            }
                        </li>
                        <li className={ sortAuteurSelect ? "sidebarItemOpen" : "sidebarItem" } onClick={ sortAuteur }>
                            <i className="bi bi-code-slash align-baseline"/>
                            <span>Auteur</span>
                            {
                                sortAuteurDesc ? <i className="bi bi-arrow-down-short me-3 align-bottom"/> : <i className="bi bi-arrow-up-short me-3 align-bottom"/>
                            }
                        </li>
                    </ul>
                </div>
                    : null
            }

            <div className="menu">
                <h4>Navigation</h4>
                <ul className="navigation">
                    <Link to="/profile/admin" className="link sidebarItem">
                        <li className={ accueilSelected ? "sidebarItemOpen" : ""} onClick={ handleAccueil }>
                            <i className="bi bi-house"/>
                            <span>Accueil</span>
                        </li>
                    </Link>
                    <Link to="/profile/admin/articles" className="link sidebarItem">
                        <li className={ articlesSelected ? "sidebarItemOpen" : ""} onClick={ handleArticles }>
                            <i className="bi bi-list"/>
                            <span>Articles</span>
                        </li>
                    </Link>
                    <Link to="/profile/admin/commentaires" className="link sidebarItem">
                        <li className={ commentairesSelected ? "sidebarItemOpen" : ""} onClick={ handleCommentaires }>
                            <i className="bi bi-chat-square-text"/>
                            <span>Commentaires</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}