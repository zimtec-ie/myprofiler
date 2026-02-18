import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./css/AdminTab.css";

/* Images */
import home from "../assets/home.png";
import profile from "../assets/add-profile.jpg";
import profileList from "../assets/profile-list.png";
import editNav from "../assets/edit-nav.png";
import documents from "../assets/documents.png";
import messages from "../assets/messages.png";
import appear from "../assets/appear.png";
import help from "../assets/help.png";

interface AdminTabProps {
  isOpen: boolean;
  setSubMenuId: (id: string) => void;
  activeTab: string | null;
  setActiveTab: (id: string) => void;
  setActiveIndex: (index: number | null) => void; 
}

const AdminTab: React.FC<AdminTabProps> = ({ 
  isOpen, 
  setSubMenuId, 
  activeTab, 
  setActiveTab,
  setActiveIndex 
}) => {
  const [smoothTrans, setClassName] = useState('hidden');


  useEffect(() => {
    if (isOpen) {
      setClassName('visible');
      setActiveTab(''); // No option selected when Admin Tab opens
      // Optionally adjust main-content-area height here if needed
    } else {
      setClassName('hidden');
      // Optionally adjust main-content-area height here if needed
    }
  }, [isOpen]);

  // This function is called when a menu item is clicked
  const openSubMenu = (id: string) => {
    setSubMenuId(id);      // This will also set subMenuActive to true in App.tsx
    setActiveTab(id);      // Highlight the active tab
    setActiveIndex(null);  // Reset the submenu item to, no highlight
  };

  return (
    <div>
      {isOpen && (
        <div id="admin-tab" className={smoothTrans}>
          <div id="home" className={`flex-container ${activeTab === 'home-options' ? 'active' : ''}`}>
            <Link className="navbar-brand" onClick={() => openSubMenu('home-options')} to="/adminhome">
              <img src={home} alt="Home" style={{ height: '40px' }} />
              <br />
              <span>Home</span>
            </Link>
          </div>
          <div id="add-profile" className={`flex-container ${activeTab === 'add-profile-options' ? 'active' : ''}`}>
            <Link className="navbar-brand" onClick={() => openSubMenu('add-profile-options')} to="/addprofile">
              <img src={profile} alt="Profile" style={{ height: '40px' }} />
              <br />
              <span>Add Profile</span>
            </Link>
          </div>
          <div id="profile-list" className={`flex-container ${activeTab === 'profile-list-options' ? 'active' : ''}`}>
            <Link className="navbar-brand" onClick={() => openSubMenu('profile-list-options')} to="/profilelist">
              <img src={profileList} alt="List Profiles" style={{ height: '40px' }} />
              <br />
              <span>Profile List</span>
            </Link>
          </div>
          <div id="edit-nav" className={`flex-container ${activeTab === 'edit-nav-options' ? 'active' : ''}`}>
            <Link className="navbar-brand" onClick={() => openSubMenu('edit-nav-options')} to="/editnav">
              <img src={editNav} alt="Edit Nav" style={{ height: '40px' }} />
              <br />
              <span>Edit Nav</span>
            </Link>
          </div>
          <div id="documents" className={`flex-container ${activeTab === 'document-options' ? 'active' : ''}`}>
            <Link className="navbar-brand" onClick={() => openSubMenu('document-options')} to="/editdocuments">
              <img src={documents} alt="Documents" style={{ height: '40px' }} />
              <br />
              <span>Documents</span>
            </Link>
          </div>
          <div id="messages" className={`flex-container ${activeTab === 'message-options' ? 'active' : ''}`}>
            <Link className="navbar-brand" onClick={() => openSubMenu('message-options')} to="/editmessages">
              <img src={messages} alt="Messages" style={{ height: '40px' }} />
              <br />
              <span>Messages</span>
            </Link>
          </div>
          <div id="appearance" className={`flex-container ${activeTab === 'appear-options' ? 'active' : ''}`}>
            <Link className="navbar-brand" onClick={() => openSubMenu('appear-options')} to="/editappearance">
              <img src={appear} alt="Appearance" style={{ height: '40px' }} />
              <br />
              <span>Appearance</span>
            </Link>
          </div>
          <div id="help" className={`flex-container ${activeTab === 'help-options' ? 'active' : ''}`}>
            <Link className="navbar-brand" onClick={() => openSubMenu('help-options')} to="/helpcenter">
              <img src={help} alt="Help Center" style={{ height: '40px' }} />
              <br />
              <span>Help Center</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTab;