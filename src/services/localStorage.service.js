export const USER_KEY = 'login'
export const USER_SAVE_KEY = 'user'
export const JWT_KEY = 'jwt'

export function setLocaleStorage(key, value) {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
}

export function getLocalStorage(key) {
    const stringValue = localStorage.getItem(key);
    return JSON.parse(stringValue);
}