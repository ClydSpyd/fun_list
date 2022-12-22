import { useState } from "react";
import { useAuth } from "../../context/AuthContext"
import Home from "../../views/Home/Home";
import NavBar from "../NavBar/NavBar";
import './MainLayout.scss';

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const [ view, toggleView ] = useState('home')

  return (
    <div className={`main-layout ${isAuthenticated && 'loggedIn'}`}>
      <NavBar />
      <div className="switch">
        <Home />
      </div>
    </div>
  )
}

export default MainLayout