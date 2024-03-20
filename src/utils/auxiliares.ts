export const convertDateToISOString = (date: Date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
}

export const getMaxDateToISOString = (): string => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return convertDateToISOString(date);
}