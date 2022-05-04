import {API_IMAGE} from "../../../utils/url.utils";
import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";
import ReactPaginate from "react-paginate";

export default function ProfileCommentaires({ setFilter, articles, handleChangeStatus, handleCheckCommentaire, updateCommentairesChecked, commentairesChecked, setCommentairesChecked, setCommentairesSelected, setSortInvalideSelect, setSortValideSelect, setSortAttenteSelect, setAccueilSelected, setArticlesSelected, sortInvalideSelect, sortAttenteSelect, sortValideSelect }) {

    const { state } = useLocation();
    let articlesFiltered = [...articles];

    const init = () => {
        setCommentairesSelected(true);
        setAccueilSelected(false);
        setArticlesSelected(false);

        setSortValideSelect(false);
        state ? setSortAttenteSelect(true) : setSortAttenteSelect(false);
        setSortInvalideSelect(false);
        state ? setFilter('&filters[commentaires][attente][$eq]=true') : setFilter('')
    }

    const optionsDate = { weekday: 'long', month: 'long', day: 'numeric' };

    const getStatus = (commentaire) => {
        if(!commentaire.attributes.valide && commentaire.attributes.attente) {
            return 'attente';
        }
        if(commentaire.attributes.valide && !commentaire.attributes.attente) {
            return 'valide';
        }
        if(!commentaire.attributes.valide && !commentaire.attributes.attente) {
            return 'invalide';
        }
        return '';
    }

    const resetChecked = () => {
        setCommentairesChecked([])
    }

    function matchFilters(commentaire) {
        return sortAttenteSelect && commentaire.attributes.attente ||
            sortValideSelect && commentaire.attributes.valide ||
            sortInvalideSelect && !commentaire.attributes.valide && !commentaire.attributes.attente ||
            !sortAttenteSelect && !sortValideSelect && !sortInvalideSelect
    }

    useEffect(init, []);
    useEffect(resetChecked, []);

    return(
        <div className="mb-4">

            <div className="d-inline-flex">
                {
                    commentairesChecked.length > 0 ? <button data-toggle="modal" data-target="#exampleModal" className="editButton mt-4 ms-4" onClick={ () => updateCommentairesChecked(true) }>Valider ({ commentairesChecked.length })</button>
                        : null
                }
                {
                    commentairesChecked.length > 0 ? <button data-toggle="modal" data-target="#exampleModal" className="deleteButton mt-4 ms-4" onClick={ () => updateCommentairesChecked(false) }>Invalider ({ commentairesChecked.length })</button>
                        : null
                }
            </div>

            <div className="postComments">
                <div className="d-inline-flex mt-3 me-3">
                    <div className="attente legende me-3"/><span>Attente</span>
                </div>
                <div className="d-inline-flex mt-3 me-3">
                    <div className="valide legende me-3"/><span>Valide</span>
                </div>
                <div className="d-inline-flex mt-3 me-3">
                    <div className="invalide legende me-3"/><span>Invalide</span>
                </div>
            </div>


            {
                articlesFiltered.map(article => {
                    if(article.attributes.commentaires.data.length > 0) {
                        return (
                            article.attributes.commentaires.data.map(commentaire => {
                                if(matchFilters(commentaire)) {
                                    return (
                                        <div className={ "postComments " + ( getStatus(commentaire) ) } key={ commentaire.id }>
                                            <input className="form-check-input float-end pointer" type="checkbox" value="" id="flexCheckDefault" onChange={ () => handleCheckCommentaire(commentaire.id) } checked={ commentairesChecked.indexOf(commentaire.id) !== -1 }/>
                                            <h5 className="mb-4">{ article.attributes.titre }</h5>
                                            <Link to={ '/article' } state={ article } className="comment-link">

                                                <div className="d-inline-flex">
                                                    <img src={ API_IMAGE + '/uploads/user_748f99fb59.png' } alt="avatar"/>
                                                    <div>
                                                <span className="commentAuthorName">
                                                {article.attributes.utilisateur.data.attributes.username} •
                                            <span className={'commentDate'}> {new Date(commentaire?.attributes.createdAt).toLocaleDateString('fr-FR', optionsDate)} à {new Date(commentaire?.attributes.createdAt).toLocaleTimeString()}</span></span>
                                                        <div className="commentAuthorName">{ article.attributes.utilisateur.data.attributes.email }</div>
                                                    </div>
                                                </div>
                                                <div className="commentText">
                                                    {commentaire?.attributes.lignes}
                                                </div>
                                            </Link>

                                            <div className="d-flex justify-content-end" role="group" aria-label="Basic radio toggle button group">
                                                <div className="me-3 " onClick={ () => handleChangeStatus(commentaire, true) }>
                                                    <input type="radio" className="btn-check" onChange={() => {}} autoComplete="off" checked={ commentaire.attributes.valide && !commentaire.attributes.attente }/>
                                                    <label className="btn btn-outline-secondary" htmlFor="valide">Valide</label>
                                                </div>
                                                <div onClick={ () => handleChangeStatus(commentaire, false) }>
                                                    <input type="radio" className="btn-check" onChange={() => {}} checked={ !commentaire.attributes.valide &&  !commentaire.attributes.attente }/>
                                                    <label className="btn btn-outline-secondary" htmlFor="invalide">Invalide</label>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        )
                    }
                })
            }
        </div>
    )
}