import Articles from "../component/articles.component";
import {useEffect, useState} from "react";
import {API} from "../../../utils/url.utils";
import ReactPaginate from "react-paginate";
import {ITEM_PER_PAGE, likeArticle, shareArticle} from "../service/articles.service";
import ArticlesFilter from "../component/articles-filter.component";
import {contextPrototype} from "../../../services/usersContext.service";
import {headerToken, token} from "../../../services/http.service";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

export default function ArticlesContainer({ sort, profileAdmin }) {

    const [articles, setArticles] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(1);
    const [filters, setFilter] = useState('');
    const [form, setForm] = useState({ search: '' });
    const [articlesChecked, setArticlsChecked] = useState([]);

    const callApi = () => {
        fetch(`${API}/articles?populate=*&pagination[pageSize]=${ ITEM_PER_PAGE }&pagination[page]=${ itemOffset }${ sort }${ filters }`, headerToken)
            .then(res => res.json())
            .then(data => {
                setArticles(data.data)
                setPageCount(data.meta.pagination.pageCount)
            })
            .catch(error => console.log(error))
    }

    useEffect(callApi, [itemOffset, ITEM_PER_PAGE, sort, filters]);

    const handlePageClick = (event) => {
        const newOffset = event.selected + 1;
        setItemOffset(newOffset);
    };

    const handleClickLike = (article) => {
        if(!contextPrototype.user) {
            return;
        }
        likeArticle(article, callApi)
    }

    const handleClickShare = (article) => {
        if(!contextPrototype.user) {
            return;
        }
        shareArticle(article, callApi)
    }

    const handleDeleteArticle = (articleId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json', 'Authorization' : 'bearer ' + token() },
        };

        fetch(`http://localhost:1337/api/articles/${articleId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if(data.data) {
                    toast.success("Article supprimé")

                    let articlesCopied = [...articles].filter(article => article.id !== articleId);
                    setArticles(articlesCopied);

                } else {
                    toast.error("Erreur : L'article n'a pas été supprimé", {
                        theme: "colored"
                    })
                }
            })
            .catch(error => console.log(error));
    }

    const handleCheckArticles = (articlesId) => {
        if(articlesChecked.indexOf(articlesId) === -1) {
            setArticlsChecked([...articlesChecked, articlesId]);
        } else {
            let articlesCheckedCopied = [...articlesChecked].filter(id => id !== articlesId);
            setArticlsChecked(articlesCheckedCopied);
        }
    }

    const deleteArticlesChecked = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token()},
        };

        for (let articleId of articlesChecked) {
            const res = await fetch(`http://localhost:1337/api/articles/${articleId}`, requestOptions);
            const data = await res.json();
            if (data) {
                toast.success("Article supprimé")
            } else {
                toast.error("Erreur : L'article n'a pas été supprimé", {
                    theme: "colored"
                })
            }
        }

        callApi();
        setArticlsChecked([]);
    }

    return (
        <div className="postList">

            <div className="d-inline-flex w-100">
                {
                    profileAdmin ?
                        <Link to="/profile/admin/articles/new" state={ null } className="editButton link mt-4 w-25">Ajouter un article</Link>
                        :
                        null
                }
                {
                    profileAdmin && articlesChecked.length > 0 ? <button data-toggle="modal" data-target="#exampleModal" className="deleteButton mt-4 ms-4" onClick={ deleteArticlesChecked }>Supprimer ({ articlesChecked.length })</button>
                        : null
                }
            </div>

            <div className="pb-5 pt-5">
                <ArticlesFilter form={ form } setForm={ setForm } setFilter={ setFilter }/>
            </div>

            <Articles
                articles={ articles }
                profileAdmin={ profileAdmin }
                articlesChecked={ articlesChecked }
                handleClickLike={ handleClickLike }
                handleClickShare={ handleClickShare }
                handleDeleteArticle={ handleDeleteArticle }
                handleCheckArticles={ handleCheckArticles }/>

            <ReactPaginate
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
                breakLabel="..."
                nextLabel="suivant >"
                onPageChange={ handlePageClick }
                pageRangeDisplayed={ 5 }
                pageCount={ pageCount }
                previousLabel="< précédent"
                renderOnZeroPageCount={ null }
            />
        </div>
    )
}