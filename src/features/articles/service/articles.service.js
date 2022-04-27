export const ITEM_PER_PAGE = 10;

export const getLectureTime = (text) => {
    let mots = text.split(' ');
    return mots.length * 60 / 200;
}