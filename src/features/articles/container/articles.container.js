import Articles from "../component/articles.component";
import {useEffect, useState} from "react";
import {API} from "../../../utils/url.utils";
import ReactPaginate from "react-paginate";
import {ITEM_PER_PAGE, likeArticle, shareArticle} from "../service/articles.service";
import ArticlesSort from "../component/articles-sort.component";
import ArticlesFilter from "../component/articles-filter.component";
import {contextPrototype} from "../../../services/usersContext.service";

export default function ArticlesContainer({ sort }) {

    const [articles, setArticles] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(1);
    const [filters, setFilter] = useState('');
    const [form, setForm] = useState({ search: '' });

    const callApi = () => {
        fetch(`${API}/articles?populate=*&pagination[pageSize]=${ ITEM_PER_PAGE }&pagination[page]=${ itemOffset }${ sort }${ filters }`)
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

    return (
        <div className="postList">
            <div className="pb-5 pt-5">
                <ArticlesFilter form={ form } setForm={ setForm } setFilter={ setFilter }/>
            </div>

            <Articles articles={ articles } handleClickLike={ handleClickLike } handleClickShare={ handleClickShare }/>

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