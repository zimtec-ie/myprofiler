import React from 'react';
import "./css/Appearance.css";
import appearanceImage from "../../assets/appearance.jpg"; // Adjust the path as needed

const Appearance: React.FC = () => {

  const devMessage = () => {
    alert("This function isn't available");
  };

  return (
    <div id="appearance-container">
      <div id="appearance-note">
        <h1>Appearance</h1>
        <p>This section has yet to be developed</p>
        <img src={appearanceImage} alt="Appearance" style={{ width: "100%", borderRadius: "8px" }} />
      </div>
    </div>
  );
}

export default Appearance;