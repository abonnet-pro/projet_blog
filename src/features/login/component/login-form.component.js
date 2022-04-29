export default function LoginForm({ form, setForm, handleSubmit }) {

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        setForm({ ...form, [key]: value })
    }

    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <div className="form-group pb-3">
                    <label htmlFor="email">Adresse mail</label>
                    <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrer email" value={ form.email } onChange={ handleChange }/>
                </div>
                <div className="form-group pb-3">
                    <label htmlFor="password">Mot de passe</label>
                    <input name="password" type="password" className="form-control" id="password" placeholder="Mot de passe" value={ form.password } onChange={ handleChange }/>
                </div>
                <button type="submit" className="btn btn-primary">Connexion</button>
            </form>
        </div>
    )
}