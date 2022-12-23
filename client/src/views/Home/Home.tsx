import { useState, useRef, useEffect } from 'react';
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
          <NewItem />
          <Boxes />
        </div>
      )}
    </div>
  );
}

export default Home