import {contextPrototype} from "../../../services/usersContext.service";
import {token} from "../../../services/http.service";

export const ITEM_PER_PAGE = 10;
export const ITEM_PER_PAGE_COMMENT = 5;

export const getLectureTime = (text) => {
    let mots = text.split(' ');
    return mots.length * 60 / 200;
}

export const getLectureTimeDisplay = (text) => {
    let timeSecond = getLectureTime(text)
    let heures = Math.floor(timeSecond / 3600);
    let minutes = Math.floor(timeSecond % 3600 / 60);
    let secondes = Math.floor(timeSecond % 3600 % 60);

    let heureDisplay = heures > 0 ? heures + (heures === 1 ? " heure, " : " heures, ") : "";
    let minuteDisplay = minutes > 0 ? minutes + (minutes === 1 ? " minute, " : " minutes, ") : "";
    let secondeDisplay = secondes >= 0 ? secondes + (secondes <= 1 ? " seconde" : " secondes") : "";
    return heureDisplay + minuteDisplay + secondeDisplay;
}

export function isArticleLiked(article) {
    if(!article) {
        return false;
    }

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
        headers: { 'Content-type': 'application/json', 'Authorization' : 'bearer ' + token() },
        body: JSON.stringify({ data: { likes: likesArticle } })
    };

    fetch(`http://localhost:1337/api/articles/${ article.id }?populate=*`, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            callback(data.data)
        })
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
        headers: { 'Content-type': 'application/json', 'Authorization' : 'bearer ' + token() },
        body: JSON.stringify({ data: { shares: likesShare } })
    };

    fetch(`http://localhost:1337/api/articles/${ article.id }?populate=*`, requestOptions)
        .then(res => res.json())
        .then(data => callback(data.data))
        .catch(error => console.log(error));
}
