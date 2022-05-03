import ProfileSidebar from "../component/profile-sidebar.component";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProfileAccueil from "../component/profile-accueil.component";
import ProfileArticles from "../component/profile-articles.component";
import ProfileCommentaires from "../component/profile-commentaires.component";
import {useEffect, useState} from "react";
import {contextPrototype} from "../../../services/usersContext.service";
import ProfileArticlesFormAdd from "../component/profile-articles-form-add.component";
import {API} from "../../../utils/url.utils";
import {headerToken, token} from "../../../services/http.service";
import {toast} from "react-toastify";
import axios from "axios";

export default function ProfileContainer() {

    const initForm = { titre: '', image: '', lignes: '', categorie: null, imagePath: '' };
    const navigate = useNavigate();
    const [sort, setSort] = useState('&sort[0]=createdAt%3Adesc');
    const [formAddArticle, setFormAddArticle] = useState(initForm);
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState();
    const [loading, setLoading] = useState(false);

    const checkProfile = () => {
        if(!contextPrototype.user) {
            navigate("/");
        }
    }

    const getCategories = () => {
        fetch(`${API}/categories`, headerToken)
            .then(res => res.json())
            .then(data => {
                setCategories(data.data)
                setFormAddArticle({ ...formAddArticle, categorie: data.data[0].id })
            })
            .catch(error => console.log(error))
    }

    useEffect(checkProfile, []);
    useEffect(getCategories, []);

    const handleSubmitAddArticle = (event) => {
        event.preventDefault();

        const body = {
            titre: formAddArticle.titre,
            utilisateur: contextPrototype.userSave.id,
            lignes: formAddArticle.lignes,
            categorie: formAddArticle.categorie,
            image: formAddArticle.image
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization' : 'bearer ' + token() },
            body: JSON.stringify({ data: body })
        };

        fetch(`http://localhost:1337/api/articles`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.data) {
                    toast.success("Article créé")
                    setFormAddArticle(initForm);
                } else {
                    toast.error("Erreur : L'article n'a pas été créé", {
                        theme: "colored"
                    })
                }
            })
            .catch(error => console.log(error));
    }

    const handleSubmitEditArticle = (event, articleId) => {
        event.preventDefault();

        const body = {
            titre: formAddArticle.titre,
            lignes: formAddArticle.lignes,
            categorie: formAddArticle.categorie,
            image: formAddArticle.image
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json', 'Authorization' : 'bearer ' + token() },
            body: JSON.stringify({ data: body })
        };

        fetch(`http://localhost:1337/api/articles/${articleId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.data) {
                    toast.success("Article modifié")
                } else {
                    toast.error("Erreur : L'article n'a pas été modifié", {
                        theme: "colored"
                    })
                }
            })
            .catch(error => console.log(error));
    }

    const uploadImg = () => {
        setLoading(true)

        const formData = new FormData()
        formData.append('files', files[0])


        axios.post("http://localhost:1337/api/upload", formData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token()
            }
        })
            .then(res => {
                if(res.data && res.data.length > 0) {
                    setFormAddArticle({ ...formAddArticle, image: res.data[0].id, imagePath: res.data[0].url} )
                    toast.success("Image chargé !")
                } else {
                    toast.error("Impossible de chargé l'image", {theme: "colored"})
                }
            }).catch((error) => {
            console.log(error)
        })

        setLoading(false)
    }

    return(
        <div className="d-flex">
            <ProfileSidebar setSort={ setSort }/>

            <div className="content">
                <Routes>
                    <Route path="" element={ <ProfileAccueil/> }/>
                    <Route path="articles" element={ <ProfileArticles sort={ sort }/> }/>
                    <Route path="articles/new" element={
                        <ProfileArticlesFormAdd
                            loading={ loading }
                            setFiles={ setFiles }
                            uploadImg={ uploadImg }
                            categories={ categories }
                            form={ formAddArticle }
                            setForm={ setFormAddArticle }
                            handleSubmitAddArticle={ handleSubmitAddArticle }
                            handleSubmitEditArticle={ handleSubmitEditArticle }/> }/>
                    <Route path="commentaires" element={ <ProfileCommentaires/> }/>
                </Routes>
            </div>
        </div>
    )
}