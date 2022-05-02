import ProfileSidebar from "../component/profile-sidebar.component";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProfileAccueil from "../component/profile-accueil.component";
import ProfileArticles from "../component/profile-articles.component";
import ProfileCommentaires from "../component/profile-commentaires.component";
import {useEffect} from "react";
import {contextPrototype} from "../../../services/usersContext.service";

export default function ProfileContainer() {

    const navigate = useNavigate();

    const checkProfile = () => {
        if(!contextPrototype.user) {
            navigate("/");
        }
    }

    useEffect(checkProfile);

    return(
        <div className="d-flex">
            <ProfileSidebar/>

            <div className="content">
                <Routes>
                    <Route path="" element={ <ProfileAccueil/> }/>
                    <Route path="articles" element={ <ProfileArticles/> }/>
                    <Route path="commentaires" element={ <ProfileCommentaires/> }/>
                </Routes>
            </div>
        </div>
    )
}