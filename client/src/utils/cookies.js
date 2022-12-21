import Cookies from 'js-cookie';

const getCookie = (name) => {
    const cookie = Cookies.get(name);
    return cookie;
}

const removeCookie = (name) => {
    const cookie = Cookies.remove(name);
    return cookie;
}

export const cookies = {
    get: getCookie,
    remove: removeCookie
}