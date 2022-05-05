import NewAccountForm from "../component/new-account-form.component";
import {useState} from "react";
import {createAccount} from "../service/login.service";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function NewAccountContainer() {

    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', username : '' ,password: '' });

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            email: form.email,
            username: form.username,
            password: form.password,
        }

        const loginCallBack = (data) => {
            if(data.data !== null) {
                navigate('/login');
            } else {
                toast.error("Inscription impossible", {
                    theme: "colored"
                });
            }
        }

        createAccount(user, loginCallBack);
    }

    return(
        <div className="login">
            <NewAccountForm form={ form } setForm={ setForm } handleSubmit={ handleSubmit }/>
        </div>
    )
}