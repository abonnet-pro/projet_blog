import {useState} from "react";

export default function NewAccountForm({ form, setForm, handleSubmit }) {

    const [regle1, setRegle1] = useState(false)
    const [regle2, setRegle2] = useState(false)
    const [regle3, setRegle3] = useState(false)
    const [regle4, setRegle4] = useState(false)
    const [regle5, setRegle5] = useState(false)

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        setForm({ ...form, [key]: value })

        if(key ==='password') {
            checkRegles(value);
        }
    }

    function checkRegles(value) {
        if(value.length >= 8) {
            setRegle1(true)
        } else {
            setRegle1(false)
        }

        if(value.match(new RegExp("[A-Z]"))){
            setRegle2(true)
        } else {
            setRegle2(false)
        }

        if(value.match(new RegExp("[a-z]"))){
            setRegle3(true)
        } else {
            setRegle3(false)
        }

        if(value.match(new RegExp("[0-9]"))){
            setRegle4(true)
        } else {
            setRegle4(false)
        }

        if(value.match(new RegExp("[`~!:;@#$%\^&\*]"))){
            setRegle5(true)
        } else {
            setRegle5(false)
        }
    }

    function passwordValid() {
        return regle1 & regle2 && regle3 && regle4 && regle5;
    }

    return(
        <div>
            <h2 className="loginTitle">Bienvenue sur Blogger</h2>
            <div className="loginForm">
                <form onSubmit={ handleSubmit }>
                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label htmlFor="email">Adresse mail</label>
                        </div>
                        <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrer email" value={ form.email } onChange={ handleChange } required/>
                    </div>
                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label htmlFor="email">Nom d'utilisateur</label>
                        </div>
                        <input name="username" type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Entrer nom d'utilisateur" value={ form.username } onChange={ handleChange } required/>
                    </div>
                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label htmlFor="password">Mot de passe</label>
                        </div>
                        <input name="password" type="password" className="form-control" id="password" placeholder="Mot de passe" value={ form.password } onChange={ handleChange } required/>
                    </div>

                    <div>
                        Veuillez choisi un mot de passe conforme :
                        <ul className="noPuce">
                            <li>{ regle1 ? <i className="bi bi-check check me-1"/> : <i className="bi bi-x wrong me-1"/> }Au moins 8 caractères</li>
                            <li>{ regle2 ? <i className="bi bi-check check me-1"/> : <i className="bi bi-x wrong me-1"/> }Au moins 1 majuscules</li>
                            <li>{ regle3 ? <i className="bi bi-check check me-1"/> : <i className="bi bi-x wrong me-1"/> }Au moins 1 minuscules</li>
                            <li>{ regle4 ? <i className="bi bi-check check me-1"/> : <i className="bi bi-x wrong me-1"/> }Au moins 1 caractères numérique</li>
                            <li>{ regle5 ? <i className="bi bi-check check me-1"/> : <i className="bi bi-x wrong me-1"/> }Au moins 1 caractères spéciale</li>
                        </ul>
                    </div>

                    <button type="submit" className={ "formButton " + (!passwordValid() ? "disabled" : "") }>Valider</button>
                </form>
            </div>
        </div>
    )
}