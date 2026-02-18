import React, { useState, useEffect } from 'react';
import "./css/SubMenu.css";
import PhilAlert from '../utils/PhilAlert';
import { getFunction } from '../utils/FunctionRegistry';

interface SubMenuProps {
  setActiveIndex: (index: number | null) => void;
  activeIndex: number | null;
  subMenuId: string;
  className?: string;
  isOpen: boolean; // Add this prop
}

const SubMenu: React.FC<SubMenuProps> = ({ setActiveIndex, activeIndex, subMenuId, className, isOpen } ) => {
  const [showPhil, setShowPhil] = useState(false);

  const devMessage = () => {
    setShowPhil(true);
  };

  const handleClick = (key: string, index: number) => {
    const func = getFunction(key);

    if (func) {     
      func();      
    } else {
      alert("This function isn't available");
    }

    setActiveIndex(index);  // This now uses the prop function
  };

  // Remove or modify this useEffect since we're managing activeIndex in App.tsx
  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(null);
    }
  }, [subMenuId, isOpen, setActiveIndex]);

  return (
    <div id="sub-menu" className={className}>
      {showPhil && (
        <PhilAlert
          message="Ah here pal, dat function aint ready yet."
          onClose={() => setShowPhil(false)}
        />
      )}
      <br />
      <br />
      {subMenuId === 'home-options' && (
        <div id="home-options">
          <p className={activeIndex === 0 ? 'active' : ''} onClick={() => handleClick('editWelcomeNote', 0)}>Edit Welcome Note</p>
          <br />
          <p className={activeIndex === 1 ? 'active' : ''} onClick={() => handleClick('editToDoList', 1)}>Edit To-Do List</p>
          <br />
          <p className={activeIndex === 2 ? 'active' : ''} onClick={() => handleClick('addReminder', 2)}>Add Reminder</p>
        </div>
      )}
      {subMenuId === 'add-profile-options' && (
        <div id="add-profile-options">          
          <p className={activeIndex === 0 ? 'active' : ''} onClick={() => handleClick('addHeader', 0)}>Add Header</p>
          <br />
          <p className={activeIndex === 1 ? 'active' : ''} onClick={() => handleClick('addLabelBox', 1)}>Add Label & Box</p>
          <br />
          <p className={activeIndex === 2 ? 'active' : ''} onClick={() => handleClick('addDescription', 2)}>Add Description</p>
          <br />
          <p className={activeIndex === 3 ? 'active' : ''} onClick={() => handleClick('addMaps', 3)}>Add Maps</p>
        </div>
      )}
      {subMenuId === 'profile-list-options' && (
        <div id="profile-list-options">
          <p onClick={devMessage}><b>Order by ID #</b></p>
          <br />
          <p onClick={devMessage}>Order by A-Z</p>
          <br />
          <p onClick={devMessage}>Order by Z-A</p>
        </div>
      )}
      {subMenuId === 'edit-nav-options' && (
        <div id="edit-nav-options">
          <p onClick={devMessage}><b>Profile Details:<br/>show always</b></p>
          <br />
          <p onClick={devMessage}>Documents:<br/><b><u>show</u></b>&nbsp;&nbsp;&nbsp;&nbsp;hide</p>
          <br />
          <p onClick={devMessage}>Messages:<br/><b><u>show</u></b>&nbsp;&nbsp;&nbsp;&nbsp;hide</p>
          <br />
          <p onClick={devMessage}>Appearance:<br/><b><u>show</u></b>&nbsp;&nbsp;&nbsp;&nbsp;hide</p>
        </div>
      )}
      {subMenuId === 'document-options' && (
        <div id="document-options">
          <p onClick={devMessage}>View as Tiles</p>
          <br />
          <p onClick={devMessage}>View as List</p>
          <br />
          <p onClick={devMessage}>View Details</p>
        </div>
      )}
      {subMenuId === 'message-options' && (
        <div id="message-options">
          <p onClick={devMessage}>Option One</p>
          <br />
          <p onClick={devMessage}>Option Two</p>
          <br />
          <p onClick={devMessage}>Option Three</p>
        </div>
      )}
      {subMenuId === 'appear-options' && (
        <div id="appear-options">
         <p onClick={devMessage}>Theme:<br/><b><u>Light</u></b>&nbsp;&nbsp;&nbsp;&nbsp;Dark</p>
          <br />
          <p onClick={devMessage}>Background Picture</p>
          <br />
          <p onClick={devMessage}>Add Welcome Page</p>
        </div>
      )}
      {subMenuId === 'help-options' && (
        <div id="help-options">
         <p onClick={devMessage}>Help Pages</p>
          <br />
          <p onClick={devMessage}>Report a bug</p>
          <br />
          <p onClick={devMessage}>Developers Guide</p>
          <br />
          <p onClick={devMessage}>About myProfiler</p>
        </div>
      )}
    </div>
  );
}

export default SubMenu;