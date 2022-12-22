import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Home.scss';

const Home = () => {
    const [ sidebarOpen, toggleSidebar ] = useState(false)
    const { isAuthenticated } = useAuth();

    useEffect(()=> {
        if(!isAuthenticated) toggleSidebar(false)
    },[isAuthenticated])

  return (
    <div className='home'>
        <div className={`sidebar ${sidebarOpen && 'open'}`}>
            <div className="handle" onClick={()=>toggleSidebar(!sidebarOpen)}>
                {`>`}
            </div>
        </div>
    </div>
  )
}

export default Home