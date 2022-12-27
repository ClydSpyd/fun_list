import { useAuth } from "../../context/AuthContext";
import { cookies } from "../../utils/cookies";
import "./NavBar.scss";
import { FiLogOut } from "react-icons/fi";

const navItems = [
  {
    text: "Home",
  },
  {
    text: "My Area",
  },
];

const NavBar = () => {
  const { setIsAuthenticated, userData } = useAuth();

  const handleLogout = () => {
    cookies.remove("auth_token");
    setIsAuthenticated(false);
    const t = cookies.get("auth_token");
    console.log(t);
  };
  return (
    <div className="nav-bar">
      <button onClick={handleLogout}>
        <p>Log out</p>
        <FiLogOut />
      </button>
      <h6 className={`retro`}>MYSTERY BOX</h6>
      <div className="nav-items">
        <div className="my-area">
          <img src={userData?.avatar} alt="" />
          <p>{userData?.userName}</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
