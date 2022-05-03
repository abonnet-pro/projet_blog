import {Link} from "react-router-dom";
import {useState} from "react";

export default function ProfileSidebar({ setSort }) {

    const [accueil, setAccueil] = useState(false);
    const [articles, setArticles] = useState(false);
    const [commentaires, setCommentaires] = useState(false);

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


    const handleAccueil = () => {
        setAccueil(true);
        setArticles(false);
        setCommentaires(false);
    }

    const handleArticles = () => {
        setAccueil(false);
        setArticles(true);
        setCommentaires(false);
    }

    const handleCommentaires = () => {
        setAccueil(false);
        setArticles(false);
        setCommentaires(true);
    }

    return(
        <div className="sidebar">

            {
                articles ?
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
                        <li className={ accueil ? "sidebarItemOpen" : ""} onClick={ handleAccueil }>
                            <i className="bi bi-house"/>
                            <span>Accueil</span>
                        </li>
                    </Link>
                    <Link to="/profile/admin/articles" className="link sidebarItem">
                        <li className={ articles ? "sidebarItemOpen" : ""} onClick={ handleArticles }>
                            <i className="bi bi-list"/>
                            <span>Articles</span>
                        </li>
                    </Link>
                    <Link to="/profile/admin/commentaires" className="link sidebarItem">
                        <li className={ commentaires ? "sidebarItemOpen" : ""} onClick={ handleCommentaires }>
                            <i className="bi bi-chat-square-text"/>
                            <span>Commentaires</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}