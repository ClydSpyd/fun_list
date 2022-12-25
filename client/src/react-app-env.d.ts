/// <reference types="react-scripts" />

interface decodedCookie {
    _doc: any;
  }

interface AuthContextObject {
    isAuthenticated: boolean;
    userId: any;
    loading: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    login:  Function;
  }

  type User = {
    _id: string,
    avatar: string,
    data: string,
    password: string,
    userName: string
  }

  type Item = {
    _id: string,
    title: string,
    decription: string,
    link: string,
    imgLink: string,
    complete: boolean,
    submittedBy: User,
    dateSubmitted: string,
  }