import axios from "axios";
import {cookies} from "./cookies";

export const apiCall = async (
  method: ApiMethod,
  endpoint: string,
  payload?: any
) => {
  const URL = process.env.REACT_APP_API_URL + endpoint;
  const auth_token = cookies.get("auth_token");
  const options = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": auth_token,
    },
  };
  const response = await axios[method](URL, payload, options);
  return response;
};