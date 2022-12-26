import axios from "axios";

type Method = 'get' | 'post';

const options = {
    withCredentials: true,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }  
}

export const apiCall = async (method: Method, endpoint: string, payload?: any) => {
    const URL = process.env.REACT_APP_API_URL + endpoint;
    const response = await axios[method](URL, payload, options);
    return response
}