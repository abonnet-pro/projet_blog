import {Link} from "react-router-dom";
import {useState} from "react";
import {toast} from "react-toastify";

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

        toast.success("Message envoyé. Une réponse vous sera fourni dans les meilleurs delais", {
            theme: "colored"
        });
    }

    return(
        <div className="m-10">
            <div className="card p-5 form">
                <h3 className="text-center">Contactez nous</h3>
                <form className="form-contact" onSubmit={ handleSubmit }>
                    <div className="form-group pb-3">
                        <label htmlFor="nom">Nom</label>
                        <input name="nom" type="text" className="form-control" id="nom" placeholder="Entrez nom" value={ form.nom } onChange={ handleChange }/>
                    </div>
                    <div className="form-group pb-3">
                        <label htmlFor="prenom">Prenom</label>
                        <input name="prenom" type="text" className="form-control" id="prenom" placeholder="Entrez prenom" value={ form.prenom } onChange={ handleChange }/>
                    </div>
                    <div className="form-group pb-3">
                        <label htmlFor="email">Email</label>
                        <input name="email" type="email" className="form-control" id="email" placeholder="Entrez email" value={ form.email } onChange={ handleChange } required/>
                    </div>
                    <div className="form-group pb-3">
                        <label htmlFor="tel">Telephone</label>
                        <input name="tel" type="tel" className="form-control" id="tel" placeholder="Entrez telephone" value={ form.tel } onChange={ handleChange }/>
                    </div>
                    <div className="form-group pb-3">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" className="form-control" id="message" placeholder="Entrez votre message ..." value={ form.message } onChange={ handleChange } required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                </form>
            </div>
        </div>
    )
}