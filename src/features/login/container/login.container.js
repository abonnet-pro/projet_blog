import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {JWT_KEY, setLocaleStorage, USER_KEY} from "../../../services/localStorage.service";
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

        connect(user, loginCallBack);
    }

    return (
        <div className="text-center card p-3 m-3 bg-light w-25">
            <LoginForm form={ form } setForm={ setForm } handleSubmit={ handleSubmit } />
        </div>
    )
}