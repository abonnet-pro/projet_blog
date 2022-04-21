export function getDiffDays(date_1, date_2) {
    let date1 = new Date(date_1);
    let date2 = new Date(date_2);
    let diffTemps = date1.getTime() - date2.getTime();
    let diffJours = diffTemps / (1000 * 3600 * 24);

    return Math.round(diffJours);
}

export function getDiffDaysByNow(date) {
    let date1 = new Date();
    let date2 = new Date(date);
    let diffTemps = date1.getTime() - date2.getTime();
    let diffJours = diffTemps / (1000 * 3600 * 24);

    return Math.round(diffJours);
}