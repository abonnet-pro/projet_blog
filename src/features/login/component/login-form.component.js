export default function LoginForm({ form, setForm, handleSubmit }) {

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        setForm({ ...form, [key]: value })
    }

    return (
        <div>
            <h2 className="loginTitle">Bienvenue sur Blogger</h2>
            <div className="loginForm">
                <form onSubmit={ handleSubmit }>
                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label htmlFor="email">Adresse mail</label>
                        </div>
                        <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrer email" value={ form.email } onChange={ handleChange }/>
                    </div>
                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label htmlFor="password">Mot de passe</label>
                        </div>
                        <input name="password" type="password" className="form-control" id="password" placeholder="Mot de passe" value={ form.password } onChange={ handleChange }/>
                    </div>
                    <button type="submit" className="formButton">Connexion</button>
                </form>
            </div>
        </div>
    )
}