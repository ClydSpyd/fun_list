import Cookies from 'js-cookie';

const getCookie = (name) => {
    const cookie = Cookies.get(name);
    return cookie;
}

const removeCookie = (name) => {
    const cookie = Cookies.remove(name);
    return cookie;
}

const addCookie = (key, value) => {
    Cookies.set(key, value);
}

export const cookies = {
    get: getCookie,
    remove: removeCookie,
    add: addCookie
}