import {contextPrototype} from "../../../services/usersContext.service";

export const ITEM_PER_PAGE = 10;

export const getLectureTime = (text) => {
    let mots = text.split(' ');
    return mots.length * 60 / 200;
}

export function isArticleLiked(article) {
    for(let like of article?.attributes.likes.data) {
        if(contextPrototype.user && like.attributes.username === contextPrototype.user.username) {
            return true;
        }
    }
    return false;
}

export function isArticleShared(article) {
    for(let share of article?.attributes.shares.data) {
        if(contextPrototype.user && share.attributes.username === contextPrototype.user.username) {
            return true;
        }
    }
    return false;
}

export function likeArticle(article, callback) {

    let articleLiked = isArticleLiked(article);
    let likesArticle = [];

    for(let like of article.attributes.likes.data) {
        likesArticle.push(like.id)
    }

    if(articleLiked) {
        likesArticle = likesArticle.filter( like => {
            return like !== contextPrototype.userSave.id
        })
    } else {
        likesArticle.push(contextPrototype.userSave.id)
    }

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ data: { likes: likesArticle } })
    };

    fetch(`http://localhost:1337/api/articles/${ article.id }`, requestOptions)
        .then(res => res.json())
        .then(_ => callback())
        .catch(error => console.log(error));
}

export function shareArticle(article, callback) {
    let articleShared = isArticleShared(article);
    let likesShare = [];

    for(let share of article.attributes.shares.data) {
        likesShare.push(share.id)
    }

    if(articleShared) {
        likesShare = likesShare.filter( share => {
            return share !== contextPrototype.userSave.id
        })
    } else {
        likesShare.push(contextPrototype.userSave.id)
    }

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ data: { shares: likesShare } })
    };

    fetch(`http://localhost:1337/api/articles/${ article.id }`, requestOptions)
        .then(res => res.json())
        .then(_ => callback())
        .catch(error => console.log(error));
}