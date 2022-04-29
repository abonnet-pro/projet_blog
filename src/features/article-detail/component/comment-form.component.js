export default function CommentForm({ form, setForm, handleSubmitFormComment }) {

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        setForm({ ...form, [key]: value })
    }

    return (
        <form onSubmit={ handleSubmitFormComment }>
            <div className="form-group pb-3">
                <textarea name="comment" className="form-control" id="comment" placeholder="Ajouter un commentaire ..." value={ form.comment } onChange={ handleChange }/>
            </div>
            {
                form.comment ? <button type="submit" className="btn btn-primary">Commenter</button> : null
            }

        </form>
    )
}