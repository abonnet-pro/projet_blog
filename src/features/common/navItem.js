import {Link} from "react-router-dom";

function MyNavItem({ isActive, itemName, path }) {
    const active = isActive ? 'active nav-link' : 'nav-link';
    return (
        <li className="nav-item">
            <Link to={ path } className={ active }>{  itemName }</Link>
        </li>
    );
}

export default MyNavItem;