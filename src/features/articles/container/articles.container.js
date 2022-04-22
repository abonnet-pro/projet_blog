import Articles from "../component/articles.component";
import {useEffect, useState} from "react";
import {API} from "../../../utils/url.utils";
import ReactPaginate from "react-paginate";
import {ITEM_PER_PAGE} from "../service/articles.service";

export default function ArticlesContainer() {

    const [articles, setArticles] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(1);

    const callApi = () => {
        fetch(`${API}/articles?populate=*&pagination[pageSize]=${ ITEM_PER_PAGE }&pagination[page]=${ itemOffset }`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setArticles(data.data)
                setPageCount(data.meta.pagination.pageCount)
            })
            .catch(error => console.log(error))
    }

    useEffect(callApi, [itemOffset, ITEM_PER_PAGE]);

    const handlePageClick = (event) => {
        const newOffset = event.selected + 1;
        setItemOffset(newOffset);
    };

    return (
        <>
            <Articles articles={ articles }/>

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
        </>
    )
}