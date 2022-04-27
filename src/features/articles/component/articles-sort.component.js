import {useState} from "react";

export default function ArticlesSort({ setSort }) {

    const [sortAuteurDesc, setSortAuteurDesc] = useState(true);
    const [sortDateDesc, setSortDateDesc] = useState(true);
    const [sortTitreDesc, setSortTitreDesc] = useState(true);

    const sortAuteur = () => {
        setSortAuteurDesc(!sortAuteurDesc);
        setSortDateDesc(true);
        setSortTitreDesc(true);
        let sort = sortAuteurDesc ? '&sort[0]=utilisateur.username%3Adesc' : '&sort[0]=utilisateur.username';
        setSort(sort);
    }

    const sortDate = () => {
        setSortDateDesc(!sortDateDesc);
        setSortAuteurDesc(true);
        setSortTitreDesc(true);
        let sort = sortDateDesc ? '&sort[1]=createdAt' : '&sort[1]=createdAt%3Adesc';
        setSort(sort);
    }

    const sortTitre = () => {
        setSortTitreDesc(!sortTitreDesc);
        setSortAuteurDesc(true);
        setSortDateDesc(true);
        let sort = sortTitreDesc ? '&sort[2]=titre%3Adesc' : '&sort[2]=titre';
        setSort(sort);
    }

    return (
        <>
            <span className="pointer badge rounded-pill bg-light me-2 fs-5" onClick={ sortAuteur }>
                Auteur
                {
                    sortAuteurDesc ? <i className="bi bi-arrow-down-short"/> : <i className="bi bi-arrow-up-short"/>
                }
            </span>
            <span className="pointer badge rounded-pill bg-light me-2 fs-5" onClick={ sortDate }>
                Date
                {
                    sortDateDesc ? <i className="bi bi-arrow-down-short"/> : <i className="bi bi-arrow-up-short"/>
                }
            </span>
            <span className="pointer badge rounded-pill bg-light me-2 fs-5" onClick={ sortTitre }>
                Titre
                {
                    sortTitreDesc ? <i className="bi bi-arrow-down-short"/> : <i className="bi bi-arrow-up-short"/>
                }
            </span>
        </>
    )
}