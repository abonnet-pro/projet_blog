import NewAccountForm from "../component/new-account-form.component";
import {useState} from "react";
import {createAccount} from "../service/login.service";
import {JWT_KEY, setLocaleStorage, USER_KEY} from "../../../services/localStorage.service";
import {contextPrototype} from "../../../services/usersContext.service";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function NewAccountContainer() {

    const navigate = useNavigate();
    const [form, setForm] = useState({ email: 'user2@user.fr', username : 'user2' ,password: 'User2!' });

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            email: form.email,
            username: form.username,
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
                toast.error("Inscription impossible", {
                    theme: "colored"
                });
            }
        }

        createAccount(user, loginCallBack);
    }

    return(
        <div className="text-center card p-3 m-3 bg-light w-25">
            <NewAccountForm form={ form } setForm={ setForm } handleSubmit={ handleSubmit }/>
        </div>
    )
}