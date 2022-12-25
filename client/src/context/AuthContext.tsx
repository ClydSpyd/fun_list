import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { cookies } from "../utils/cookies";
import jwt from "jwt-decode";
const tokenCookie = cookies.get("auth_token");

interface Props {
  children?: ReactNode;
}

const defaultData = {
  isAuthenticated: false,
  userId: null,
  loading: false,
  setIsAuthenticated: (): void => {},
  login: (): void => {},
};

const AuthContext = createContext<AuthContextObject>(defaultData);

export const AuthContextProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokenCookie);
  const [loading, toggleLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if(tokenCookie){
      const decoded: decodedCookie = jwt(tokenCookie);
      setUserId(decoded._doc._id)
    }
  },[tokenCookie])


  const login = async (payload: any) => {
    toggleLoading(!loading)
    const { data } = await axios.post("/api/auth/login", payload);
    if (data.id) {
      console.log('data')
      console.log(data)
      setUserId(data.id);
      setIsAuthenticated(true);
    }
    toggleLoading(false);
    return data;
  };
  
  return (
    <AuthContext.Provider
      value={{ userId, isAuthenticated, loading, setIsAuthenticated, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
