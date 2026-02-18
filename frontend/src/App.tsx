import React, { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios';
import getBaseURL from './config';
// CSS
import "./css/App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// Login
import Login from "./Login"; 
// Layout
import NavBar from "./layout/NavBar";
import AdminTab from "./layout/AdminTab";
import LeftPane from "./layout/LeftPane";
import SubMenu from "./layout/SubMenu";

// Components
    //Admin
import AdminHome from "./components/admin/AdminHome";
import AddProfile from "./components/admin/AddProfile";
import ProfileList from "./components/admin/ProfileList";
import ViewProfile from "./components/admin/ViewProfile";
import EditProfile from "./components/admin/EditProfile";
import EditNav from "./components/admin/EditNav";
import EditDocuments from "./components/admin/EditDocuments";
import EditMessages from "./components/admin/EditMessages";
import EditAppearance from "./components/admin/EditAppearance";
import HelpCenter from "./components/admin/HelpCenter";
    //Standard
import ProfileDetails from "./components/standard/ProfileDetails";
import EditDetails from "./components/standard/EditDetails";
import Documents from "./components/standard/Documents";
import Messages from "./components/standard/Messages";
import Appearance from "./components/standard/Appearance";


const App: React.FC = () => {
  interface Profile {
    id: number;
    privilege: string;
    name: string;
    email: string;
    password: string;
  }
  
  const [isOpen, setIsOpen] = useState(false); // Admin tab state
  const [isAdmin, setIsAdmin] = useState(false); // Admin or Standard Privileges state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [loggedInProfile, setLoggedInProfile] = useState<Profile | null>(null); // State to store the logged-in user's profile
  const [image, setImage] = useState<number[] | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null); // State to track the active tab in the Admin Tab
  const [subMenuId, setSubMenuId] = useState(''); // State to store the ID of the clicked element
  const [subMenuActive, setSubMenuActive] = useState(false); // NEW
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const baseURL = getBaseURL();


 

  // Close the Admin Tab by default but toggle depending on isOpen state
  const toggleAdminTab = async () => {
    setIsOpen(!isOpen);

    // Redirect to the logged-in profile when the Admin Tab is closed
    if (loggedInProfile && isOpen) {
      navigate(`/profiledetails/${loggedInProfile.id}`);
    }
    if (isOpen) setSubMenuActive(false); // Hide submenu when closing
  };

  // Show Admin Button based on Privileges
  const showAdminButton = (privilege: string) => {
    if (privilege === 'admin') {
      setIsAdmin(true);
    } else if (privilege === 'standard') {
      setIsAdmin(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      /* const result = await axios.get<Profile[]>(`${baseURL}/profiles`); */
      const result = await axios.get<Profile[]>(`${baseURL}/login`);
      const profiles = result.data;

      const profile = profiles.find((profile) => 
        profile.email === email && profile.password === password
      );

      if (profile) {
        setIsAuthenticated(true); //the email and password are correct
        setIsOpen(false); // Close the Admin tab after successful login
        showAdminButton(profile.privilege); // Update isAdmin state based on privilege
        setLoggedInProfile(profile); // sets State for profile logged-in, used for ToggleAdminTab 
        
        localStorage.setItem('loggedInUserId', profile.id.toString()); // update local storage with profile ID, used for deleteProfile in ViewProfile.tsx
        
        // load the image
        const imageResult = await axios.get(`${baseURL}/profile/${profile.id}/image`, { responseType: 'arraybuffer' });
        const byteArray = new Uint8Array(imageResult.data as ArrayBuffer);
        if (byteArray.length === 0) {
          setImage(null);
        } else {
          setImage(Array.from(byteArray));
        }
        
        // Navigate to the profile details page of the logged-in user
        navigate(`/profiledetails/${profile.id}`);

      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('myProfiler is offline. Contact Support to book a Demo.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedInProfile(null);
    localStorage.removeItem('loggedInUserId');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />; // Render Login component if not authenticated
  }

  return (
    <div id="App">
        {/* Top of page */}
        <NavBar
          user={{
            name: loggedInProfile?.name || "",
            profilePic: image,
            isAdmin: isAdmin,
          }}
          adminTab={{
            isOpen: isOpen,
            toggle: toggleAdminTab,
            showButton: showAdminButton,
          }}
          onLogout={handleLogout}
        />
        <AdminTab 
          isOpen={isOpen} 
          setSubMenuId={(id: string) => {
            setSubMenuId(id);
            setSubMenuActive(true); // Show submenu when menu item clicked
          }} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setActiveIndex={setActiveIndex}
        />

        {/* Left of Page */}
        <LeftPane className={isOpen ? "off-screen" : ""} />
        <SubMenu 
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
          subMenuId={subMenuId} 
          className={isOpen && subMenuActive ? "on-screen" : ""} 
          isOpen={isOpen}          
        />

        {/* Main Content Area */}
        <div id="main-content-area">
          <Routes>
            /* Routes for Admin */
            <Route 
              path="/adminhome" 
              element={<AdminHome setActiveIndex={setActiveIndex} />} 
            />
            <Route path="/profilelist" Component={ProfileList} />
            <Route 
              path="/addprofile"
              element={<AddProfile setActiveTab={setActiveTab} setSubMenuId={setSubMenuId} setActiveIndex={setActiveIndex} />}
            />
            <Route path="/editprofile/:id" Component={EditProfile} />
            <Route path="/viewprofile/:id" Component={ViewProfile} />
            <Route path="/editnav" Component={EditNav} />
            <Route path="/editdocuments" Component={EditDocuments} />
            <Route path="/editmessages" Component={EditMessages} />
            <Route path="/editappearance" Component={EditAppearance} />

            /* Routes for Standard */
            <Route path="/profiledetails/:id" Component={ProfileDetails} />
            <Route path="/editdetails/:id" Component={EditDetails} />
            <Route path="/documents" Component={Documents} />
            <Route path="/messages" Component={Messages} />
            <Route path="/appearance" Component={Appearance} />   
            <Route path="/helpcenter" Component={HelpCenter} />          
          </Routes>
        </div>
      
    </div>
  );
}

export default App;

