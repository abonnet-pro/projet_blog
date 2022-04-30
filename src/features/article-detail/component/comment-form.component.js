export default function CommentForm({ form, setForm, handleSubmitFormComment }) {

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        setForm({ ...form, [key]: value })
    }

    return (
        <div className="ps-3 pe-3 mt-5">
            <form onSubmit={ handleSubmitFormComment }>
                <div className="formGroup">
                    <textarea name="comment" className="commentFormArea" id="comment" placeholder="Ajouter un commentaire ..." value={ form.comment } onChange={ handleChange }/>
                </div>
                {
                    form.comment ? <button type="submit" className="btn btn-primary">Commenter</button> : null
                }

            </form>
        </div>

    )
}