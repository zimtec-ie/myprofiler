import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/NavBar.css";
import logo from "../assets/logo.jpg"; 
import defaultPic from "../assets/profile.jpg";

interface NavBarProps {
  user: {
    name: string;
    profilePic: number[] | null;
    isAdmin: boolean;
  };
  adminTab: {
    isOpen: boolean;
    toggle: () => Promise<void>;
    showButton: (privilege: string) => void;
  };
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ user, adminTab, onLogout }) => {
  const [showUserInfo, setShowUserInfo] = useState(false);

  const handleProfileClick = () => {
    setShowUserInfo(!showUserInfo);
  };

  const handleLogoutClick = () => {
    onLogout();
    adminTab.toggle();
  };

  const AdminTabButton = async () => {
    await adminTab.toggle();
    setShowUserInfo(!showUserInfo);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#d6d7db' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="http://zimtec.ie/products.html#myProfiler" target="_blank" rel="noopener noreferrer">
            <img src={logo} alt="Logo" style={{ height: '50px' }} />
          </a>
          
          <div className="d-flex align-items-center position">
            <img
              id="user-pic"
              src={user.profilePic ? `data:image/jpeg;base64,${btoa(String.fromCharCode(...user.profilePic))}` : defaultPic}
              alt="Profile"
              onClick={handleProfileClick}
            />
            {showUserInfo && (
              <div id="user-info">
                <p>{user.name}</p>
                {user.isAdmin && (
                  <>
                    {adminTab.isOpen ? (
                      <button id="admin-button-on" onClick={AdminTabButton}>
                        Admin Menu
                      </button>
                    ) : (
                      <Link to="/">
                        <button id="admin-button-off" onClick={AdminTabButton}>
                          Admin Menu
                        </button>
                      </Link>
                    )}
                    <br />
                  </>
                )}
                <Link to="/">
                  <button className="btn btn-outline-danger" onClick={handleLogoutClick} style={{marginTop:'10px'}}>Logout</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
