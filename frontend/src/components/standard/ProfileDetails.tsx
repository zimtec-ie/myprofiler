import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/CommonProfile.css";
import defaultPic from "../../assets/profile.jpg";
import getBaseURL from '../../config';

const ProfileDetails: React.FC = () => {
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

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line
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

  return (
    <div className="content-container">
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
                    <div className="form-control">{profile.privilege}</div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <div className="form-control">{profile.name}</div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <div className="form-control">{profile.email}</div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="form-control">********</div>
                  </div>
                </div>
                <div className="btn-row">
                  <Link
                    className="btn-edit"
                    to={`/editdetails/${profile.id}`}
                  >
                    Edit
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
