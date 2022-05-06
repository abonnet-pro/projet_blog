import {contextPrototype} from "../../../services/usersContext.service";
import {API_IMAGE} from "../../../utils/url.utils";

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

    const checkDisplay = (commentaire) => {
        return commentaire.attributes.valide ||
            (commentaire?.attributes.utilisateur.data.attributes.username === contextPrototype.user?.username && commentaire.attributes.attente) ||
            contextPrototype.userSave?.attributes?.admin && commentaire.attributes.valide ||
            contextPrototype.userSave?.attributes?.admin && commentaire.attributes.attente
    }

    return (
            <div className="comments">
                <div className="comment-number mb-4">{ getCommentsNumber(commentaires) } { getCommentsNumber(commentaires) ? "commentaire" : "commentaires"}</div>

                        {
                            commentaires.map(commentaire => {
                                return (
                                    <div key={ commentaire.id }>
                                        {
                                             checkDisplay(commentaire) ?
                                                <div className="postComments">
                                                    <img src={ API_IMAGE + '/uploads/user_748f99fb59.png' } alt="avatar"/>
                                                    <span className="commentAuthorName">
                                                    {
                                                        commentaire?.attributes.attente ?
                                                            <i className="bi bi-hourglass-split me-2 text-primary align"
                                                               data-toggle="tooltip" data-placement="top"
                                                               title="En attente de validation"/>
                                                            :
                                                            null
                                                    }
                                                    {commentaire?.attributes.utilisateur.data.attributes.username} •
                                                    <span className={'commentDate'}> {new Date(commentaire?.attributes.createdAt).toLocaleDateString('fr-FR', optionsDate)} à {new Date(commentaire?.attributes.createdAt).toLocaleTimeString()}</span></span>
                                                    <div className="commentText">
                                                        {commentaire?.attributes.lignes}
                                                    </div>
                                                </div>
                                                : null
                                        }
                                    </div>
                                )
                            })
                        }
                </div>
    )
}