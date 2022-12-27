/// <reference types="react-scripts" />


type ApiMethod = 'get' | 'post' | 'put';
type ItemFilters = { [index: string]: any };
// type ItemFilters = { [index: string]: boolean[] | string[] };
// type ItemFilters = { submittedBy: string[]; complete: boolean[] };

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