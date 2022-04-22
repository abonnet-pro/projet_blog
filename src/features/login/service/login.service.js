export function connect(user, callback) {

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
        .then(data => callback(data))
        .catch(error => console.log(error));
}

export function createAccount(user, callback) {

}
