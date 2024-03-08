export const getCookieParam = (param: string) => {
    const cookies = document.cookie.split(';');
    let value = null;

    cookies.forEach(cookie => {
        const [nombre, valor] = cookie.trim().split('=');
        if (nombre === param) {
            value = valor;
        }
    });

    return value;
};

export const removeCookieParam = (param: string) => {
    const cookies = document.cookie.split(';');
    let value = null;

    const cookie = cookies.find(c => c.trim().startsWith(param));

    if (cookie) {
        const cookieName = cookie.split('=')[0].trim();
        // Establecer la cookie con el valor vacío y fecha de expiración en el pasado
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}