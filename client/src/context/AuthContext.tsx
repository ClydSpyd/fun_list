import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from 'axios'
import { cookies } from "../utils/cookies";

export interface AuthContextObject {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login:  Function;
}


const tokenCookie = cookies.get('auth_token');

const defaultData = {
  isAuthenticated: false,
  setIsAuthenticated: (): void => {},
  login: (): void => {}
};

const AuthContext = createContext<AuthContextObject>(defaultData);
interface Props {
  children?: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokenCookie);

  const login = async (payload: any) => {
    const { data } = await axios.post("/api/auth/login", payload);
    if (data.id) {
      setIsAuthenticated(true);
    }
    return data;
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
