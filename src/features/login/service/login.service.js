import {toast} from "react-toastify";

export function connect(user, loginCallBack, utilisateurCallBack) {

    const body = {
        identifier: user.email,
        password: user.password,
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body)
    };

    fetch(`http://localhost:1337/api/auth/local`, requestOptions)
        .then(res => res.json())
        .then(data => {
            loginCallBack(data)
            fetch(`http://localhost:1337/api/utilisateurs`)
                .then(res => res.json())
                .then(data => utilisateurCallBack(data))
        })
        .catch(error => console.log(error));
}

export function createAccount(user, callback) {
    const body = {
        username: user.username,
        email: user.email,
        password: user.password,
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body)
    };

    fetch(`http://localhost:1337/api/auth/local/register`, requestOptions)
        .then(res => res.json())
        .then(data => {
            callback(data)
            createUser(user)
        })
        .catch(error => console.log(error));
}

function createUser(user) {

    const body = {
        username: user.username,
        email: user.email,
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ data: body })
    };

    fetch(`http://localhost:1337/api/utilisateurs`, requestOptions)
        .then(res => res.json())
        .then(res => {
            if(res.data) {
                toast.success("Inscription validé, veuillez vous connecter");
            }
        })
        .catch(error => console.log(error));
}
