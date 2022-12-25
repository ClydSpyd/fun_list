import { useAuth } from "../../context/AuthContext"
import { cookies } from "../../utils/cookies";
import './NavBar.scss'
import { FiLogOut } from "react-icons/fi";

const navItems = [
    {
        text: 'Home'
    },
    {
        text: 'My Area'
    }
]

const NavBar = () => {
    const { setIsAuthenticated } = useAuth();

    const handleLogout = () => {
        cookies.remove('auth_token')
        setIsAuthenticated(false);
        const t = cookies.get('auth_token')
        console.log(t)
    }
  return (
    <div className="nav-bar">
      <div className="nav-items">
        {/* {
            navItems.map(i => 
                   <div className="nav-item">{i.text}</div> 
            )
        } */}
      </div>
      <h6 className={`retro`}>MYSTERY BOX</h6>
      <button onClick={handleLogout}>Logout <FiLogOut /></button>
    </div>
  );
};

export default NavBar;
