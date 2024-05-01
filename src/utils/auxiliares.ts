export const convertDateToISOString = (date: Date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
}

export const converDateTimeToStandarString = (date: Date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);

    return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

export const currentDateToISOString = (): string => {
    return convertDateToISOString(new Date());
}

export const getMaxDateToISOString = (): string => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return convertDateToISOString(date);
}