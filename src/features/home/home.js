import ArticlesContainer from "../articles/container/articles.container";
import Sidebar from "../common/sidebar";
import {useState} from "react";

export default function Home() {

    const [sort, setSort] = useState('&sort[0]=createdAt%3Adesc');

    return (
        <div className="home">
            <Sidebar setSort={ setSort }/>
            <ArticlesContainer sort={ sort }/>
        </div>
    )
}