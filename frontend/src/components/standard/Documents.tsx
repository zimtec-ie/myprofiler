import React from 'react';
import "./css/Documents.css";
import documentsImage from "../../assets/documents.jpg"; 

const Documents: React.FC = () => {

  const devMessage = () => {
    alert("This function isn't available");
  };

  return (
    <div id="documents-container">
      <div id="documents-note">
        <h1>Documents</h1>
        <p>This section has yet to be developed</p>
        <img src={documentsImage} alt="Documents" style={{ width: "100%", borderRadius: "8px" }} />
      </div>
    </div>
  );
}

export default Documents;