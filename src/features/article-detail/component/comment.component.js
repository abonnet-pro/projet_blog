import {contextPrototype} from "../../../services/usersContext.service";

export default function Commentaires({ commentaires }) {

    const optionsDate = { weekday: 'long', month: 'long', day: 'numeric' };

    const getCommentsNumber = (commentaires) => {
        let commentsValide = 0;
        for(let commentaire of commentaires) {
            if(commentaire?.attributes.valide) {
                commentsValide++;
            }
        }
        return commentsValide;
    }

    return (
        <div className="comments">
            <div className="comment-number mb-4">{ getCommentsNumber(commentaires) } { getCommentsNumber(commentaires) ? "commentaire" : "commentaires"}</div>
            {
                commentaires.map(commentaire => {
                    return (
                        <div key={ commentaire.id }>{
                            !commentaire?.attributes.valide && commentaire?.attributes.utilisateur.data.attributes.username !== contextPrototype.user.username ?
                            null
                            :
                            <div>
                                <p>
                                    {
                                        commentaire?.attributes.valide ? null : <i className="bi bi-hourglass-split me-2 text-primary align" data-toggle="tooltip" data-placement="top" title="En attente de validation"/>
                                    }

                                    Le { new Date(commentaire?.attributes.createdAt).toLocaleDateString('fr-FR', optionsDate) } à { new Date(commentaire?.attributes.createdAt).toLocaleTimeString() }, par <b>{ commentaire?.attributes.utilisateur.data.attributes.username }</b>
                                </p>

                                <div className="card p-4 mb-5">
                                    { commentaire?.attributes.lignes}
                                </div>
                            </div>
                        }
                        </div>
                    )
                })
            }
        </div>
    )
}