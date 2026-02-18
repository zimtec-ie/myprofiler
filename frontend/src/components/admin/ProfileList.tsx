import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import getBaseURL from '../../config';

const ProfileList: React.FC = () => {
  interface Profile {
    id: number;
    privilege: string;
    name: string;
    email: string;
    password: string;
  }

  const [profiles, setProfiles] = useState<Profile[]>([]);

  useParams<{ id: string; }>();

  const baseURL = getBaseURL();
  const navigate = useNavigate();

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    const result = await axios.get<Profile[]>(`${baseURL}/profiles`);
    setProfiles(result.data);
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Privileges</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, index) => (             
              <tr key={index} onClick={() => navigate(`/viewprofile/${profile.id}`)} style={{ cursor: 'pointer' }}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>               
                <td>{profile.privilege}</td>
                <td>{profile.name}</td>
                <td>{profile.email}</td>
                <td>********</td>
              </tr>
             
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileList;
