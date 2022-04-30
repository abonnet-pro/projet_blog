import MyNavItem from "./navItem";
import {Link} from "react-router-dom";
import {getLocalStorage, USER_KEY} from "../../services/localStorage.service";
import {contextPrototype} from "../../services/usersContext.service";

export default function MyNavBar() {

    const user = getLocalStorage(USER_KEY);

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <a className="navbar-brand title text-primary fw-bold" href="/">Blogger</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto">
                        {/*<MyNavItem path="/" itemName="Acceuil" isActive={ true }/>*/}
                        {/*<MyNavItem path="/infos" itemName="A propos" isActive={ false }/>*/}
                        {/*<MyNavItem path="/contact" itemName="Contact" isActive={ false }/>*/}
                    </ul>

                    {/*{*/}
                    {/*    user?.id ? <span>{ contextPrototype.user.username }</span> : null*/}
                    {/*}*/}

                    {
                        user?.id ? null : <Link to="/creation/compte" className="btn btn-outline-primary ms-2">Créer un compte</Link>
                    }

                    {
                        user?.id ?
                            <Link to="/logout" className="btn btn-primary ms-2">Se deconnecter</Link>
                            : <Link to="/login" className="btn btn-primary ms-2">Se connecter</Link>
                    }
                </div>
            </div>
        </nav>
    );
}