import React from 'react';
import "./css/Messages.css";
import messagesImage from "../../assets/messages.jpg"; // Adjust the path as needed

const Messages: React.FC = () => {

  const devMessage = () => {
    alert("This function isn't available");
  };

  return (
    <div id="messages-container">
      <div id="messages-note">
        <h1>Messages</h1>
        <p>This section has yet to be developed</p>
        <img src={messagesImage} alt="Messages" style={{ width: "100%", borderRadius: "8px" }} />
      </div>
    </div>
  );
}

export default Messages;