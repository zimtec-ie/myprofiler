import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../css/CommonProfile.css";
import defaultPic from "../../assets/profile.jpg";
import getBaseURL from "../../config";

const ViewProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    id: "",
    privilege: "",
    name: "",    
    email: "",
    password: "",
  });

  const { id } = useParams<{ id: string }>();
  const [image, setImage] = useState<number[] | null>(null);
  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const baseURL = getBaseURL();
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const result = await axios.get<{ id: string; privilege: string; name: string; email: string; password: string; }>(`${baseURL}/profile/${id}`);
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

  const getLoggedInUserId = (): number | null => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    return loggedInUserId ? parseInt(loggedInUserId, 10) : null;
  };

  const deleteProfile = async (id: any) => {
    const UserId = getLoggedInUserId();
    await axios.delete(`${baseURL}/profile/${id}`);
    if (id === UserId) {
      localStorage.removeItem('loggedInUserId');
      window.location.replace('http://zimtec.ie/products/myprofiler/');
    } else {
      navigate(`/profilelist`);
    }    
  };

  return (
    <div id="content-container">
      <h2 className="content-title">View Profile ID : {profile.id}</h2>
      <div className="row-container">
        <div className="form-container">
          {/* Accordion Section */}
          <div className="accordion-section">
            <div
              className="accordion-header"
              onClick={() => setBasicInfoOpen((open) => !open)}
            >
              <span>Basic Info</span>
              <span className="accordion-toggle">{basicInfoOpen ? "▲" : "▼"}</span>
            </div>
            {basicInfoOpen && (
              <>
                <div className="accordion-content">
                  <div className="profile-pic-container">
                    <img
                      src={image ? `data:image/jpeg;base64,${btoa(String.fromCharCode(...image))}` : defaultPic}
                      alt="Profile"
                      id="profile-pic"
                    />                    
                  </div>
                  <div className="form-group">
                    <label className="form-label">Privileges</label>
                    <div className="form-control">
                      {profile.privilege}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <div className="form-control">
                      {profile.name}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">E-mail</label>
                    <div className="form-control">
                      {profile.email}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="form-control">
                      ********
                    </div>
                  </div>
                </div>
                <div className="btn-row">
                  <Link className="btn-back" to={"/profilelist"}>
                    Back
                  </Link>
                  <Link
                    className="btn-edit"
                    to={`/editprofile/${profile.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn-delete"
                    onClick={() => {   
                      const loggedInUserId = getLoggedInUserId();
                      const UserId = loggedInUserId !== null ? loggedInUserId.toString() : null;
                      
                      if (profile.id == UserId) {
                        if (!window.confirm(`Are you sure you want to delete your own profile?`)) {
                          return;
                        }
                        deleteProfile(profile.id);
                      } else {
                        if (!window.confirm(`Are you sure you want to delete ${profile.name}'s profile?`)) {
                          return;
                        }
                        deleteProfile(profile.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
