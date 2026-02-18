import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CommonProfile.css";
import profilePic from "../../assets/profile.jpg";
import getBaseURL from '../../config';
import { registerFunction } from '../../utils/FunctionRegistry';
import PhilAlert from '../../utils/PhilAlert';

interface AddProfileProps {
  setActiveTab: (id: string) => void;
  setSubMenuId: (id: string) => void; 
  setActiveIndex: (index: number | null) => void;
}

const AddProfile: React.FC<AddProfileProps> = ({ setActiveTab, setSubMenuId, setActiveIndex }) =>{
  let navigate = useNavigate();

  const [profile, setProfile] = useState({
    privilege: "",
    name: "",    
    email: "",
    password: "",
  });

  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const { privilege, name, email, password } = profile;
  const baseURL = getBaseURL();
  const [showPhil, setShowPhil] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(`${baseURL}/profile`, profile);

    // Update both the active tab and submenu ID
    setActiveTab("profile-list-options");
    setActiveIndex(null);
    navigate("/profilelist");
  };

  // Register functions for SubMenu actions
  useEffect(() => {    
    registerFunction('addHeader', () => {     
      // Close Basic Info accordion
      setBasicInfoOpen(false);   

      window.alert("Add Header Function clicked");
    });
    registerFunction('addLabelBox', () => {
      setShowPhil(true);
    });
    registerFunction('addDescription', () => {
      setShowPhil(true);
    });
    registerFunction('addMaps', () => {
      setShowPhil(true);
    });
  }, []);

  // Add function to handle Basic Info toggle
  const toggleBasicInfo = () => {
    setBasicInfoOpen(prev => !prev);
  };

  return (
    <div id="content-container">
      {showPhil && (
        <PhilAlert
          message="Ah here pal, dat function aint ready yet."
          onClose={() => {
            setShowPhil(false);
            setActiveIndex(null);            
          }}
        />
      )}
      <br />
      <br />
      <div className="row-container">
        <div className="form-container">
          <form onSubmit={onSubmit}>
            {/* Basic Info Accordion Section */}
            <div className="accordion-section">
              <div
                className="accordion-header"
                onClick={toggleBasicInfo}
              >
                <span>Basic Info</span>
                <span className="accordion-toggle">{basicInfoOpen ? "▲" : "▼"}</span>
              </div>
              {basicInfoOpen && (
                <>
                  <div className="accordion-content">
                    <div className="profile-pic-container">
                      <img src={profilePic} alt="ProfilePic" id="profile-pic" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Privilege" className="form-label">
                        Privileges
                      </label>
                      <select
                        className="form-control"
                        name="privilege"
                        value={privilege}
                        onChange={onInputChange}
                        required
                      >
                        <option value="">Select Privilege</option>
                        <option value="admin">Admin</option>
                        <option value="standard">Standard</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="Name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        name="name"
                        value={name}
                        onChange={onInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Email" className="form-label">
                        E-mail
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email address"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        required
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        title="Please enter a valid email address."
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Password" className="form-label">
                        Password
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                        autoComplete="new-password"
                        required
                        pattern="^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"
                        title="Password must be at least 8 characters long, include at least one uppercase letter, and one number."
                      />
                    </div>
                  </div>
                  <div className="btn-row">
                    <button type="submit" className="btn-save">
                      Save
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProfile;
