import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {API, API_IMAGE} from "../../../utils/url.utils";
import {headerToken} from "../../../services/http.service";

export default function ProfileArticlesFormAdd({ loading, categories, form, setForm, handleSubmitAddArticle, setFiles, uploadImg, handleSubmitEditArticle }) {

    const { state }  = useLocation();
    const [openImgChooser, setOpenImgChooser] = useState(false);
    const [images, setImages] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(state) {
            handleSubmitEditArticle(event, state.id);
        } else {
            handleSubmitAddArticle(event);
        }
    }

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        setForm({ ...form, [key]: value })
    }

    const handleChangeFile = (event) => {
        setFiles(event.target.files)
    }

    const checkEdit = () => {
        if(state) {
            setForm({ visible: state.attributes.visible ,titre: state.attributes.titre, image: state.attributes.image.data.id, lignes: state.attributes.lignes, categorie: state.attributes.categorie.data.id, imagePath: state.attributes.image.data.attributes.url })
        } else {
            setForm({ titre: '', image: '', lignes: '', categorie: categories[0].id, visible: true })
        }
    }

    const handleChangeSwitch = (event) => {
        setForm({ ...form, visible: event.target.checked })
    }

    useEffect(checkEdit, []);

    const getImg = () => {
        setOpenImgChooser(true);

        fetch(`${API}/upload/files`, headerToken)
            .then(res => res.json())
            .then(data => setImages(data))
            .catch(error => console.log(error))
    }

    const handleClose = () => {
        setOpenImgChooser(false);
    };

    const selectImg = (image) => {
        setForm({ ...form, image: image.id, imagePath: image.url })
    }

    return(
        <div className="formBody">
            <h2 className="formTitle mb-4">{ state ? 'Modifier l\'article' : 'Ajouter un article' }</h2>
            <div className="loginForm">
                <form onSubmit={ handleSubmit }>
                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label htmlFor="titre">Visibilité</label>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={ handleChangeSwitch } defaultChecked={ form.visible }/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{ form.visible ? "Visible" : "Non visible" }</label>
                        </div>
                    </div>

                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label htmlFor="titre">Titre de l'article</label>
                        </div>
                        <input name="titre" type="titre" className="form-control" id="titre" placeholder="Entrer titre" value={ form.titre } onChange={ handleChange } required/>
                    </div>
                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label htmlFor="categorie">Categorie de l'article</label>
                        </div>
                        <select className="form-select pointer" name="categorie" id="categorie" value={ form.categorie } onChange={ handleChange }>
                            {
                                categories.map(categorie => {
                                    return (
                                        <option key={ categorie.id } value={ categorie.id }>{ categorie.attributes.titre}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label htmlFor="lignes">Texte</label>
                        </div>
                        <textarea name="lignes" className="form-control" id="lignes" placeholder="Saisir le texte" value={ form.lignes } onChange={ handleChange } required/>
                    </div>


                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label htmlFor="image">Charger image</label>
                        </div>
                        <div className="d-inline-flex">
                            <input className="form-control" type="file" name="image" id="image" onChange={ handleChangeFile }/>
                            <button className={ "formButton w-25 ms-2 " + (loading ? "disabled" : "")} type="button" onClick={ uploadImg }>
                                {
                                    loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> : 'Upload'
                                }
                            </button>
                        </div>
                    </div>

                    <p className="text-center">Ou</p>

                    <div className="formGroup">
                        <div className="formGroupInfo">
                            <label htmlFor="imageChoose">Choisir image</label>
                        </div>
                        <div className="d-inline-flex">
                            <input disabled className="form-control" type="text" name="imageChoose" id="imageChoose" value={ form.imagePath }/>
                            <button className={ "formButton w-25 ms-2 " + (loading ? "disabled" : "")} type="button" onClick={ getImg }>
                                {
                                    loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> : 'Ouvrir'
                                }
                            </button>
                        </div>
                    </div>


                    {
                        form.image ? (
                            <div className="formGroup">
                                <div className="formGroupInfo">
                                    <label htmlFor="image">Image</label>
                                </div>
                                <img  className="articleImg" src={ API_IMAGE + form.imagePath } alt="articlePicture"/>
                            </div>
                        ) : null
                    }

                    <button type="submit" className={ "formButton " + (loading ? "disabled" : '')}>
                        {
                            loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> : 'Enregistrer'
                        }
                    </button>
                </form>


                {
                    openImgChooser ? (
                        <div className="myModal">
                            <div className="contentModal">
                                <h1 className="text-primary text-center mb-3">Choisir une image</h1>
                                <div className="images">
                                    {
                                        images.map(image => {
                                            return(
                                                <img width={60} height={60} src={ API_IMAGE + image.url } alt="avatar" onClick={ () => selectImg(image) }/>
                                            )
                                        })
                                    }
                                </div>
                                <div id="buttons" className="d-flex justify-content-center mt-3">
                                    <button className="editButton me-3" onClick={ handleClose }>Valider</button>
                                    <button className="deleteButton" onClick={ handleClose }>Annuler</button>
                                </div>
                            </div>
                        </div>
                    ) : null
                }


            </div>
        </div>
    )
}