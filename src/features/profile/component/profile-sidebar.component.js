import {Link} from "react-router-dom";
import {useState} from "react";

export default function ProfileSidebar() {

    const [accueil, setAccueil] = useState(false);
    const [articles, setArticles] = useState(false);
    const [commentaires, setCommentaires] = useState(false);

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