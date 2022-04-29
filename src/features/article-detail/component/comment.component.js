export default function Commentaires({ commentaires }) {

    const optionsDate = { weekday: 'long', month: 'long', day: 'numeric' };

    return (
        <div className="comments">
            <div className="comment-number mb-4">{ commentaires?.length } { commentaires?.length === 1 ? "commentaire" : "commentaires"}</div>
            {
                commentaires.map(commentaire => {
                    return <div key={ commentaire.id }>
                        <p>
                            {
                                commentaire?.attributes.valide ? null : <i className="bi bi-hourglass-split me-2 text-primary" data-toggle="tooltip" data-placement="top" title="En attente de validation"/>
                            }

                            Le { new Date(commentaire?.attributes.createdAt).toLocaleDateString('fr-FR', optionsDate) } à { new Date(commentaire?.attributes.createdAt).toLocaleTimeString() }, par <b>{ commentaire?.attributes.utilisateur.data.attributes.username }</b>
                        </p>

                        <div className="card p-4 mb-5">
                            { commentaire?.attributes.lignes}
                        </div>
                    </div>
                })
            }
        </div>
    )
}