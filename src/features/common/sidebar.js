import {useState} from "react";
import {Link} from "react-router-dom";
import {contextPrototype} from "../../services/usersContext.service";

export default function Sidebar({ setSort }) {

    const [sortDateSelect, setSortDateSelect] = useState(false);
    const [sortTitreSelect, setSortTitreSelect] = useState(false);
    const [sortAuteurSelect, setSortAuteurSelect] = useState(false);

    const [sortAuteurDesc, setSortAuteurDesc] = useState(true);
    const [sortDateDesc, setSortDateDesc] = useState(true);
    const [sortTitreDesc, setSortTitreDesc] = useState(true);

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



    return(
        <div className="sidebar">
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

            <div className="menu mt-5">
                <h4>Navigation</h4>
                <ul>
                    <Link to="/" className="link sidebarItem">
                        <li>
                            <i className="bi bi-house"/>
                            <span>Accueil</span>
                        </li>
                    </Link>
                    <Link to="/infos" className="link sidebarItem">
                        <li>
                            <i className="bi bi-info-circle"/>
                            <span>Infos</span>
                        </li>
                    </Link>
                    <Link to="/contact" className="link sidebarItem">
                        <li>
                            <i className="bi bi-chat-square-text"/>
                            <span>Contact</span>
                        </li>
                    </Link>
                    {
                        contextPrototype.userSave && contextPrototype.userSave.attributes.admin ? <Link to="/profile/admin" className="link sidebarItem">
                            <li>
                                <i className="bi bi-person-square"/>
                                <span>Profile</span>
                            </li>
                        </Link>
                            : null
                    }

                </ul>
            </div>
        </div>
    )
}