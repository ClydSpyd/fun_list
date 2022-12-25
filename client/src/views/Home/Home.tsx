import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import Boxes from '../../components/Boxes/Boxes';
import NewItem from '../../components/NewItem/NewItem';
import { useAuth } from '../../context/AuthContext';
import './Home.scss';

const Home = () => {
    const [ sidebarOpen, toggleSidebar ] = useState(true)
    const sidebarRef = useRef(null)
    const { isAuthenticated } = useAuth();


    useEffect(()=> {
        toggleSidebar(isAuthenticated)
    },[isAuthenticated])
    
    const getItems = async () => {
      const { data } = await axios.get('/api/item/get_all');
      console.log(data);
      return data
  }
  const itemsQuery = useQuery('items', getItems);

  return (
    <div className="home">
      <div ref={sidebarRef} className={`sidebar ${sidebarOpen && "open"}`}>
        <div
          className={`handle ${sidebarOpen && "open"}`}
          onClick={() => toggleSidebar(!sidebarOpen)}
        >
          {`>`}
        </div>
      </div>
      {isAuthenticated && (
        <div className="container">
          <NewItem query={itemsQuery} />
          <Boxes query={itemsQuery} />
        </div>
      )}
    </div>
  );
}

export default Home