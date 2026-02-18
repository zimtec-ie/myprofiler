import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../css/CommonProfile.css";
import defaultPic from "../../assets/profile.jpg";
import getBaseURL from '../../config';

const EditProfile: React.FC = () => {

  const [profile, setProfile] = useState({
    id:"",
    privilege: "",
    name: "",    
    email: "",
    password: "",
  });
   
  const { id } = useParams<{ id: string }>();
  const { privilege, name, email, password } = profile;
  const [image, setImage] = useState<number[] | null>(null);
  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const baseURL = getBaseURL();
  const navigate = useNavigate();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProfile();
  }, []);
  
  const loadProfile = async () => {
    const result = await axios.get<{ id: string; privilege: string; name: string; email: string, password: string; }>(`${baseURL}/profile/${id}`);
    setProfile(result.data);

    // load the image
    const imageResult = await axios.get(`${baseURL}/profile/${id}/image`, { responseType: 'arraybuffer' });
    const byteArray = new Uint8Array(imageResult.data as ArrayBuffer);
    if (byteArray.length === 0) {
      setImage(null);
    } else {
      setImage(Array.from(byteArray));
    }

  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.put(`${baseURL}/profile/${id}`, profile);
    navigate(`/viewprofile/${id}`);
  };

  return (
    <div id="content-container">
      <h2 className="content-title">Edit Profile ID : {profile.id}</h2>
      <div className="row-container">
        <div className="form-container">
          <div className="accordion-section">
            <div
              className="accordion-header"
              onClick={() => setBasicInfoOpen((open) => !open)}
            >
              <span>Basic Info</span>
              <span className="accordion-toggle">{basicInfoOpen ? "▲" : "▼"}</span>
            </div>
            {basicInfoOpen && (
              <form onSubmit={onSubmit}>
                <div className="accordion-content">
                  <div className="profile-pic-container">
                    <img
                      src={image ? `data:image/jpeg;base64,${btoa(String.fromCharCode(...image))}` : defaultPic}
                      alt="Profile"
                      id="profile-pic"
                    />
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
                  <Link
                    className="btn-cancel"
                    to={`/viewprofile/${id}`}
                    style={{ marginLeft: "16px" }}
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
