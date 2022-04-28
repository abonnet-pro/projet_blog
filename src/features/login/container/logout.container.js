import {contextPrototype} from "../../../services/usersContext.service";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Logout({ setUser, setUserSave }) {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        setUser('');
        setUserSave('')
        contextPrototype.user = '';
        contextPrototype.setUser = '';
        contextPrototype.userSave = '';
        contextPrototype.setUserSave = '';
        navigate('/');
    }

    useEffect(logout, []);
}