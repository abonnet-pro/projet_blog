import {useState} from "react";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

export default function Contact() {

    const initialForm = { nom: '', prenom: '', email: '', tel: '', message: '' }
    const [form, setForm] = useState(initialForm);

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        setForm({ ...form, [key]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setForm(initialForm);

        toast.success("Message envoyé. Une réponse vous sera fourni dans les meilleurs delais");
    }

    return(
        <>
            <div className="ms-5">
                <Link to={'/'} className="link">
                    <button className="back">
                        <i className="bi bi-arrow-left"/>
                        <span>Accueil</span>
                    </button>
                </Link>
            </div>

            <div className="formBody">
                    <h2 className="formTitle">Contactez nous</h2>
                    <div className="mt-3">
                        <form onSubmit={ handleSubmit }>
                            <div className="formGroup">
                                <div className="formGroupInfo">
                                    <label htmlFor="nom">Nom</label>
                                </div>
                                <input name="nom" type="text" className="form-control" id="nom" placeholder="Entrez nom" value={ form.nom } onChange={ handleChange }/>
                            </div>
                            <div className="formGroup">
                                <div className="formGroupInfo">
                                    <label htmlFor="prenom">Prenom</label>
                                </div>
                                <input name="prenom" type="text" className="form-control" id="prenom" placeholder="Entrez prenom" value={ form.prenom } onChange={ handleChange }/>
                            </div>
                            <div className="formGroup">
                                <div className="formGroupInfo">
                                    <label htmlFor="email">Email</label>
                                </div>
                                <input name="email" type="email" className="form-control" id="email" placeholder="Entrez email" value={ form.email } onChange={ handleChange } required/>
                            </div>
                            <div className="formGroup">
                                <div className="formGroupInfo">
                                    <label htmlFor="tel">Telephone</label>
                                </div>
                                <input name="tel" type="tel" className="form-control" id="tel" placeholder="Entrez telephone" value={ form.tel } onChange={ handleChange }/>
                            </div>
                            <div className="formGroup">
                                <div className="formGroupInfo">
                                    <label htmlFor="message">Message</label>
                                </div>
                                <textarea name="message" className="form-control" id="message" placeholder="Entrez votre message ..." value={ form.message } onChange={ handleChange } required/>
                            </div>
                            <button type="submit" className="formButton">Envoyer</button>
                        </form>
                    </div>
            </div>
        </>
    )
}