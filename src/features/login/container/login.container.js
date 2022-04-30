import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {JWT_KEY, setLocaleStorage, USER_KEY, USER_SAVE_KEY} from "../../../services/localStorage.service";
import {contextPrototype} from "../../../services/usersContext.service";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from "../component/login-form.component";
import {connect} from "../service/login.service";

export default function LoginContainer() {

    const navigate = useNavigate();
    const [form, setForm] = useState({ email: 'admin@admin.fr', password: 'Admin!' });

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            email: form.email,
            password: form.password,
        }

        const loginCallBack = (data) => {
            if(data.data !== null) {
                localStorage.clear();
                setLocaleStorage(JWT_KEY, data.jwt);
                setLocaleStorage(USER_KEY, data.user)
                contextPrototype.setUser(data.user);
                navigate('/');
            } else {
                toast.error("Connexion impossible, vérifiez vos identifiants", {
                    theme: "colored"
                });
            }
        }

        const utilisateurCallBack = (utilisateurs) => {
            if(utilisateurs.data !== null) {
                for(let utilisateur of utilisateurs.data) {
                    if(utilisateur.attributes.email === contextPrototype.user.email) {
                        setLocaleStorage(USER_SAVE_KEY, utilisateur)
                        contextPrototype.setUserSave(utilisateur);
                    }
                }
            }
        }

        connect(user, loginCallBack, utilisateurCallBack);
    }

    return (
        <div className="login">
            <LoginForm form={ form } setForm={ setForm } handleSubmit={ handleSubmit } />
        </div>
    )
}