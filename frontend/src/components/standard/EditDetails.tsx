import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../css/CommonProfile.css";
import "./css/EditDetails.css";
import defaultPic from "../../assets/profile.jpg";
import getBaseURL from '../../config';

const EditDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState({
    privilege: "",
    name: "",
    email: "",
    password: "",
  });
  const { privilege, name, email, password } = profile;

  const [image, setImage] = useState<number[] | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const baseURL = getBaseURL();
  const navigate = useNavigate();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line
  }, []);

  const loadProfile = async () => {
    const result = await axios.get<{ privilege: string; name: string; email: string; password: string; }>(`${baseURL}/profile/${id}`);
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSizeInKB = file.size / 1024;
      if (fileSizeInKB > 100) {
        setFileError('File size should not exceed 100KB');
        return;
      } else {
        setFileError(null);
      }

      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        const byteArray = new Uint8Array(reader.result as ArrayBuffer);
        const byteArrayAsArray = Array.from(byteArray);

        // Send the byte array to the backend
        await axios.put(`${baseURL}/profile/${id}/image`, byteArrayAsArray, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Store the byte array in the state
        setImage(byteArrayAsArray);
      };
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedProfile = { ...profile, image };
    await axios.put(`${baseURL}/profile/${id}`, updatedProfile);  
    navigate(`/profiledetails/${id}`);
  };

  return (
    <div className="content-container">
      <h2 className="content-title">Edit Profile</h2>
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
                <div className="ed-accordion-content">
                  <div className="fields-row">
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
                        required
                        disabled
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
                        required
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Email" className="form-label">
                        E-mail
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter email address"
                        name="email"
                        value={email}
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="fields-row">
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
                    <div className="form-group">
                      <label htmlFor="profileImage" className="form-label">
                        Upload Photo
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="profileImage"
                        onChange={handleImageUpload}
                      />
                      {fileError && <div className="text-danger">{fileError}</div>}
                    </div>
                  </div>
                </div>
                  <div className="btn-row">
                    <button type="submit" className="btn-save">
                      Save
                    </button>
                    <Link
                      className="btn-cancel"
                      to={`/profiledetails/${id}`}
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

export default EditDetails;
