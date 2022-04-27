export default function ArticlesFilter({ form, setForm, setFilter }) {

    const handleSubmit = (event) => {
        event.preventDefault();

        let filter = `&filters[$or][0][titre][$contains]=${ form.search }&filters[$or][1][categorie][titre][$contains]=${ form.search }&filters[$or][2][utilisateur][username][$contains][2]=${ form.search }`
        setFilter(filter)
    }

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        setForm({ ...form, [key]: value })
    }

    return(
            <form onSubmit={ handleSubmit } className="d-flex">
                <input className="form-control me-sm-2" type="text" placeholder="Titre, Categorie, Auteur ... " name="search" value={ form.search } onChange={ handleChange } />
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Rechercher</button>
            </form>
    )
}
