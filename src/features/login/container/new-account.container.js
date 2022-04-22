import NewAccountForm from "../component/new-account-form.component";
import {useState} from "react";
import {createAccount} from "../service/login.service";

export default function NewAccountContainer() {

    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            email: form.email,
            password: form.password,
        }

        const loginCallBack = (data) => {
        }

        createAccount(user, loginCallBack);
    }

    return(
        <div className="text-center card p-3 m-3 bg-light w-25">
            <NewAccountForm form={ form } setForm={ setForm } handleSubmit={ handleSubmit }/>
        </div>
    )
}