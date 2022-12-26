import axios from "axios";
import {cookies} from "./cookies";

type Method = 'get' | 'post';

const auth_token = cookies.get('auth_token')
axios.defaults.headers.common['x-auth-token'] = auth_token;

const options = {
  headers: { "Content-Type": "application/json" },
};

export const apiCall = async (method: Method, endpoint: string, payload?: any) => {
    const URL = process.env.REACT_APP_API_URL + endpoint;
    const response = await axios[method](URL, payload, options);
    return response
}