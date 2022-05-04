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

    const initForm = { titre: '', image: '', lignes: '', categorie: null, imagePath: '', visible: true };
    const navigate = useNavigate();
    const [sort, setSort] = useState('&sort[0]=createdAt%3Adesc');
    const [formAddArticle, setFormAddArticle] = useState(initForm);
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState();
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [commentairesChecked, setCommentairesChecked] = useState([]);
    const [filters, setFilter] = useState('');

    const [accueilSelected, setAccueilSelected] = useState(false);
    const [articlesSelected, setArticlesSelected] = useState(false);
    const [commentairesSelected, setCommentairesSelected] = useState(false);

    const [sortAttenteSelect, setSortAttenteSelect] = useState(false);
    const [sortValideSelect, setSortValideSelect] = useState(false);
    const [sortInvalideSelect, setSortInvalideSelect] = useState(false);

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

    const callApi = () => {
        fetch(`${API}/articles?populate=*${filters}&filters[visible][$eq]=true&sort[0]=createdAt%3Adesc`, headerToken)
            .then(res => res.json())
            .then(data => {
                setArticles(data.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(checkProfile, []);
    useEffect(getCategories, []);
    useEffect(callApi, [filters]);

    const handleSubmitAddArticle = (event) => {
        event.preventDefault();

        const body = {
            titre: formAddArticle.titre,
            utilisateur: contextPrototype.userSave.id,
            lignes: formAddArticle.lignes,
            categorie: formAddArticle.categorie,
            image: formAddArticle.image,
            visible: formAddArticle.visible
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization' : 'bearer ' + token() },
            body: JSON.stringify({ data: body })
        };

        fetch(`http://localhost:1337/api/articles`, requestOptions)
            .then(res => res.json())
            .then(data => {
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
            image: formAddArticle.image,
            visible: formAddArticle.visible
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

    const handleChangeStatus = (commentaire, valide) => {
        const body = {
            attente: false,
            valide: valide
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json', 'Authorization' : 'bearer ' + token() },
            body: JSON.stringify({ data: body })
        };

        fetch(`http://localhost:1337/api/commentaires/${commentaire.id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if(data.data) {
                    toast.success("Commentaire modifié")
                    callApi()
                } else {
                    toast.error("Erreur : Le commentaire n'a pas été modifié", {
                        theme: "colored"
                    })
                }
            })
            .catch(error => console.log(error));
    }

    const handleCheckCommentaire = (commentaireId) => {
        if(commentairesChecked.indexOf(commentaireId) === -1) {
            setCommentairesChecked([...commentairesChecked, commentaireId]);
        } else {
            let commentaireCheckedCopied = [...commentairesChecked].filter(id => id !== commentaireId);
            setCommentairesChecked(commentaireCheckedCopied);
        }
    }

    const updateCommentairesChecked = async (valide) => {
        const body = {
            attente: false,
            valide: valide
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json', 'Authorization' : 'bearer ' + token() },
            body: JSON.stringify({ data: body })
        };

        for (let commentaireId of commentairesChecked) {
            const res = await fetch(`http://localhost:1337/api/commentaires/${commentaireId}`, requestOptions);
            const data = await res.json();
            if (data) {
                toast.success("Commentaire modifié")
            } else {
                toast.error("Erreur : Le commentaire n'a pas été modifié", {
                    theme: "colored"
                })
            }
        }

        callApi();
        setCommentairesChecked([]);
    }

    return(
        <div className="d-flex">
            <ProfileSidebar
                setFilter={ setFilter }
                setSort={ setSort }
                accueilSelected={ accueilSelected }
                articlesSelected={ articlesSelected }
                commentairesSelected={ commentairesSelected }
                setAccueilSelected={ setAccueilSelected }
                setArticlesSelected={ setArticlesSelected }
                setCommentairesSelected={ setCommentairesSelected }
                sortAttenteSelect={ sortAttenteSelect }
                setSortAttenteSelect={ setSortAttenteSelect }
                sortValideSelect={ sortValideSelect }
                setSortValideSelect={ setSortValideSelect }
                sortInvalideSelect={ sortInvalideSelect }
                setSortInvalideSelect={ setSortInvalideSelect }
            />

            <div className="content">
                <Routes>
                    <Route path="" element={
                        <ProfileAccueil
                            callApi={ callApi }
                            articles={ articles }
                            accueilSelected={ accueilSelected }
                            setAccueilSelected={ setAccueilSelected }/>
                    }/>
                    <Route path="articles" element={
                        <ProfileArticles
                            sort={ sort }
                            setArticlesSelected={ setArticlesSelected }/>
                    }/>
                    <Route path="articles/new" element={
                        <ProfileArticlesFormAdd
                            loading={ loading }
                            setFiles={ setFiles }
                            uploadImg={ uploadImg }
                            categories={ categories }
                            form={ formAddArticle }
                            setForm={ setFormAddArticle }
                            handleSubmitAddArticle={ handleSubmitAddArticle }
                            handleSubmitEditArticle={ handleSubmitEditArticle }/>
                    }/>
                    <Route path="commentaires" element={
                        <ProfileCommentaires
                            sortAttenteSelect={ sortAttenteSelect }
                            sortValideSelect={ sortValideSelect }
                            setFilter={ setFilter }
                            setAccueilSelected={ setAccueilSelected }
                            setArticlesSelected={ setArticlesSelected }
                            setCommentairesSelected={ setCommentairesSelected }
                            articles={ articles }
                            commentairesChecked={ commentairesChecked }
                            setCommentairesChecked={ setCommentairesChecked }
                            setSortValideSelect={ setSortValideSelect }
                            sortInvalideSelect={ sortInvalideSelect }
                            setSortInvalideSelect={ setSortInvalideSelect }
                            setSortAttenteSelect={ setSortAttenteSelect }
                            updateCommentairesChecked={ updateCommentairesChecked }
                            handleChangeStatus={ handleChangeStatus }
                            handleCheckCommentaire={ handleCheckCommentaire }/>
                    }/>
                </Routes>
            </div>
        </div>
    )
}