import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./css/LeftPane.css";

interface LeftPaneProps {
  className?: string;
}

const LeftPane: React.FC<LeftPaneProps> = ({ className }) => {
  const location = useLocation();

  const getLoggedInUserId = (): number | null => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    return loggedInUserId ? parseInt(loggedInUserId, 10) : null;
  };

  const UserId = getLoggedInUserId();

  return (
    <div id="left-pane" className={className}>
      <br />
      <Link to={`/profiledetails/${UserId}`}>
        <p className={
          location.pathname === `/profiledetails/${UserId}` ||
          location.pathname === `/editdetails/${UserId}`
            ? 'active'
            : ''
        }>
          Profile Details
        </p>
      </Link>
      <Link to="/documents">
        <p className={location.pathname === '/documents' ? 'active' : ''}>
          Documents
        </p>
      </Link>
      <Link to="/messages">
        <p className={location.pathname === '/messages' ? 'active' : ''}>
          Messages
        </p>
      </Link>
      <Link to="/appearance">
        <p className={location.pathname === '/appearance' ? 'active' : ''}>
          Appearance
        </p>
      </Link> 
    </div>
  );
}

export default LeftPane;