/// <reference types="react-scripts" />


type ApiMethod = 'get' | 'post' | 'put';

type Tags = 'Food' | 'Active' | 'Creative' | 'Culture' | 'Booze' | 'Outdoor' | 'Trip' | 'Exhibition' | 'Hike' | 'Road-trip' | 'Montaña' | 'Playa';

type ItemFilters = { [index: string]: any };

interface decodedCookie {
    _doc: any;
  }

interface AuthContextObject {
    isAuthenticated: boolean;
    userId: any;
    userData: User | null;
    loading: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    login:  Function;
  }

  type User = {
    _id: string,
    avatar: string,
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


  
// type ItemFilters = { [index: string]: boolean[] | string[] };
// type ItemFilters = { submittedBy: string[]; complete: boolean[] };