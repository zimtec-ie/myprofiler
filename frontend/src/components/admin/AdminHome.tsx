import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./css/AdminHome.css";
import getBaseURL from '../../config';
import { registerFunction } from '../../utils/FunctionRegistry';
import FifiAlert from '../../utils/FifiAlert';

interface AdminHomeProps {
  setActiveIndex: (index: number | null) => void;  
}

const AdminHome: React.FC<AdminHomeProps> = ({ setActiveIndex }) => {  
  //Reminders
  const [showOverlay, setshowOverlay] = useState(false);
    // Redminer 1
  const [showReminderOne, setShowReminderOne] = useState(true);
  const [reminderOne, setReminderOne] = useState<string>("Loading...");
  const [RemOneEditor, setRemOneEditorOn] = useState(false);
  const [editedReminderOne, setEditedReminderOne] = useState<string>("");
    // Redminer 2
  const [showReminderTwo, setShowReminderTwo] = useState(true);
  const [reminderTwo, setReminderTwo] = useState<string>("Loading...");
  const [RemTwoEditor, setRemTwoEditorOn] = useState(false);
  const [editedReminderTwo, setEditedReminderTwo] = useState<string>("");
    // Redminer 3
  const [showReminderThree, setShowReminderThree] = useState(true);
  const [reminderThree, setReminderThree] = useState<string>("Loading...");
  const [RemThreeEditor, setRemThreeEditorOn] = useState(false);
  const [editedReminderThree, setEditedReminderThree] = useState<string>("");
  //Welcome Note
  const [welcomeNote, setWelcomeNote] = useState<string>("Loading...");
  const [WNEditor, setWNEditorOn] = useState(false);
  const [editedWelcomeNote, setEditedWelcomeNote] = useState<string>("");
  //To Do List
  const [toDoList, setToDoList] = useState<string>("Loading...");
  const [TDLEditor, setTDLEditorOn] = useState(false);
  const [editedToDoList, setEditedToDoList] = useState<string>(""); 

  const baseURL = getBaseURL();
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  const [fifiAlert, setFifiAlert] = useState<{ show: boolean; message: string }>({ show: false, message: "" });

  // Register functions for SubMenu actions
  useEffect(() => {    
    registerFunction('editWelcomeNote', () => {
      // can toggle this if reminder overlay covers entire screen (fixed css) or just the Admin Home (absolute css) page
      //setshowOverlay(false); 

      setWNEditorOn(true);
      setEditedWelcomeNote(welcomeNote);
    });

    registerFunction('editToDoList', () => {
      // can toggle this if reminder overlay covers entire screen (fixed css) or just the Admin Home (absolute css) page
      //setshowOverlay(false); 

      setTDLEditorOn(true);
      setEditedToDoList(toDoList);
    });

    registerFunction('addReminder', () => {
      // Turn off other editors: optional
      //setWNEditorOn(false);
      //setTDLEditorOn(false);
      
      const hasOne = !!reminderOne;
      const hasTwo = !!reminderTwo;
      const hasThree = !!reminderThree;

      setshowOverlay(true);

      // If all three reminders are filled, show the overlay and then the alert
      if (hasOne && hasTwo && hasThree) {
        setShowReminderOne(true);
        setShowReminderTwo(true);
        setShowReminderThree(true);
        setRemOneEditorOn(false);
        setRemTwoEditorOn(false);
        setRemThreeEditorOn(false);
        setEditedReminderOne(reminderOne);
        setEditedReminderTwo(reminderTwo);
        setEditedReminderThree(reminderThree);

        // Use setTimeout to ensure the overlay renders before the alert
        setTimeout(() => {
          setFifiAlert({
            show: true,
            message: "Only 3 reminders buddy. Start a To-Do List!"
          });
        }, 0);
        return;
      }

      // If all reminders are empty, show the first one
      if (!hasOne && !hasTwo && !hasThree) {
        setShowReminderOne(true);
        setShowReminderTwo(false);
        setShowReminderThree(false);
        setRemOneEditorOn(true);
        setRemTwoEditorOn(false);
        setRemThreeEditorOn(false);
        setEditedReminderOne("Type something...");
        setEditedReminderTwo("");
        setEditedReminderThree("");
      } 
      // If one reminder is empty, show the next one
      else if (!hasOne) {
        setShowReminderOne(true);
        setShowReminderTwo(hasTwo);
        setShowReminderThree(hasThree);
        setRemOneEditorOn(true);
        setRemTwoEditorOn(false);
        setRemThreeEditorOn(false);
        setEditedReminderOne("Type something...");
        setEditedReminderTwo(reminderTwo);
        setEditedReminderThree(reminderThree);
      } 
      // If two reminders are empty, show the last one
      else if (!hasTwo) {
        setShowReminderOne(true);
        setShowReminderTwo(true);
        setShowReminderThree(hasThree);
        setRemOneEditorOn(false);
        setRemTwoEditorOn(true);
        setRemThreeEditorOn(false);
        setEditedReminderOne(reminderOne);
        setEditedReminderTwo("Type something...");
        setEditedReminderThree(reminderThree);
      } 
      // If three reminders are empty, show the last one
      else if (!hasThree) {
        setShowReminderOne(true);
        setShowReminderTwo(true);
        setShowReminderThree(true);
        setRemOneEditorOn(false);
        setRemTwoEditorOn(false);
        setRemThreeEditorOn(true);
        setEditedReminderOne(reminderOne);
        setEditedReminderTwo(reminderTwo);
        setEditedReminderThree("Type something...");
      } 
      // If all reminders are filled, show all three
      else {
        setShowReminderOne(true);
        setShowReminderTwo(true);
        setShowReminderThree(true);
        setRemOneEditorOn(false);
        setRemTwoEditorOn(false);
        setRemThreeEditorOn(false);
        setEditedReminderOne(reminderOne);
        setEditedReminderTwo(reminderTwo);
        setEditedReminderThree(reminderThree);
      }
    });
  }, [welcomeNote, toDoList, reminderOne, reminderTwo, reminderThree]);

  // Welcome Note Functions
  const loadWelcomeNote = async () => {
    try {
      const profileId = loggedInUserId;
      const response = await axios.get(`${baseURL}/profile/${profileId}/welcomenote`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to fetch welcome note");
      }
      // Handle both cases: 
      // 1. plain string (default API) or 
      // 2. object with a 'note' property (saved user Note API)
      const data = response.data as { note?: string } | string;
      const note = typeof data === "string" ? data : data.note || "";
      setWelcomeNote(note);
    } catch (error) {
      console.error("Error fetching welcome note:", error);
      setWelcomeNote("Failed to load welcome note.");
    }
  };

  const saveWelcomeNote = async () => {
    try {
      const profileId = loggedInUserId;
      const response = await axios.put(`${baseURL}/profile/${profileId}/welcomenote`, { note: editedWelcomeNote });
     if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to save welcome note");
      }
      setWelcomeNote(editedWelcomeNote);
      setWNEditorOn(false);
      setActiveIndex(null);
    } catch (error) {
      console.error("Error saving welcome note:", error);
      alert("Failed to save welcome note.");
    }
  };

  const defaultWelcomeNote = async () => {
    try {
      const profileId = loggedInUserId;
      const response = await axios.delete(`${baseURL}/profile/${profileId}/welcomenote`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to reset welcome note to default");
      }     
      setWNEditorOn(false);
      setWelcomeNote("Loading...");
      loadWelcomeNote();
      setActiveIndex(null);
    } catch (error) {
      console.error("Error resetting welcome note:", error);
      alert("Failed to reset welcome note.");
    }
  };

  useEffect(() => {
    loadWelcomeNote();
  }, []);

  // To Do List Functions
  const loadToDoList = async () => {
    try {
      const profileId = loggedInUserId;
      const response = await axios.get(`${baseURL}/profile/${profileId}/todolist`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to fetch To-Do List");
      }
      // Handle both cases: 
      // 1. plain string (default API) or 
      // 2. object with a 'note' property (saved user Note API)
      const data = response.data as { list?: string } | string;
      const list = typeof data === "string" ? data : data.list || "";
      setToDoList(list);
    } catch (error) {
      console.error("Error fetching To-Do List:", error);
      setToDoList("Failed to load To-Do List.");
    }
  };

  const saveToDoList = async () => {
    try {
      const profileId = loggedInUserId;
      const response = await axios.put(`${baseURL}/profile/${profileId}/todolist`, { list: editedToDoList });
     if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to save To-Do List");
      }
      setToDoList(editedToDoList);
      setTDLEditorOn(false);
      setActiveIndex(null);
    } catch (error) {
      console.error("Error saving To-Do List:", error);
      alert("Failed to save To-Do List.");
    }
  };

  const defaultToDoList = async () => {
    try {
      const profileId = loggedInUserId;
      const response = await axios.delete(`${baseURL}/profile/${profileId}/todolist`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to reset To-Do List to default");
      }     
      setTDLEditorOn(false);
      setToDoList("Loading...");
      loadToDoList();
      setActiveIndex(null);
    } catch (error) {
      console.error("Error resetting To-Do List:", error);
      alert("Failed to reset To-Do List.");
    }
  };

  useEffect(() => {
    loadToDoList();
  }, []);

  // Reminder Functions
  const closeAllReminders = () => {
    setshowOverlay(false);
  };

  const closeReminder = (reminder: 'one' | 'two' | 'three') => {
    if (reminder === 'one') setShowReminderOne(false);
    if (reminder === 'two') setShowReminderTwo(false);
    if (reminder === 'three') setShowReminderThree(false);
    setActiveIndex(null);
    // Use updated values to check if all are closed
    setTimeout(() => {
      if (
        (reminder === 'one' ? false : showReminderOne) === false &&
        (reminder === 'two' ? false : showReminderTwo) === false &&
        (reminder === 'three' ? false : showReminderThree) === false
      ) {
        setshowOverlay(false);
      }
    }, 0);
  };

  // Helper to split and join reminders as reminders are stored as a single string
  const parseReminders = (reminderString: string) => {
    const [one = "", two = "", three = ""] = reminderString.split("|||");
    return [one, two, three];
  };
  const joinReminders = (one: string, two: string, three: string) => {
    return [one, two, three].join("|||");
  };

  const loadReminders = async () => {
    try {
      const profileId = loggedInUserId;
      const response = await axios.get(`${baseURL}/profile/${profileId}/reminder`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to fetch reminder");
      }
      const data = response.data as { note?: string } | string | null;
      let note = "";
      if (data === null) {
        note = "";
      } else {
        note = typeof data === "string" ? data : data.note || "";
      }
      const [one, two, three] = parseReminders(note || "");
      setReminderOne(one);
      setReminderTwo(two);
      setReminderThree(three);

      // Only show reminders if they have text
      setShowReminderOne(!!one);
      setShowReminderTwo(!!two);
      setShowReminderThree(!!three);

      // Only show overlay if at least one reminder has text
      setshowOverlay(!!one || !!two || !!three);
    } catch (error) {
      console.error("Error fetching reminder:", error);
      setReminderOne("Failed to load reminder.");
      setReminderTwo("Failed to load reminder.");
      setReminderThree("Failed to load reminder.");
      setShowReminderOne(false);
      setShowReminderTwo(false);
      setShowReminderThree(false);
      setshowOverlay(false);
    }
  };

  const saveReminder = async (reminder: 'one' | 'two' | 'three') => {
    try {
      const profileId = loggedInUserId;
      // Get current reminders
      const currentReminders = [reminderOne, reminderTwo, reminderThree];
      if (reminder === 'one') currentReminders[0] = editedReminderOne;
      if (reminder === 'two') currentReminders[1] = editedReminderTwo;
      if (reminder === 'three') currentReminders[2] = editedReminderThree;
      const joined = joinReminders(currentReminders[0], currentReminders[1], currentReminders[2]);
      const response = await axios.put(`${baseURL}/profile/${profileId}/reminder`, { note: joined });
     if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to save reminder");
      }
      setReminderOne(currentReminders[0]);
      setReminderTwo(currentReminders[1]);
      setReminderThree(currentReminders[2]);
      if (reminder === 'one') setRemOneEditorOn(false);
      if (reminder === 'two') setRemTwoEditorOn(false);
      if (reminder === 'three') setRemThreeEditorOn(false);
      setActiveIndex(null);
    } catch (error) {
      console.error("Error saving reminder:", error);
      alert("Failed to save reminder.");
    }
  };
  
  const deleteReminder = async (reminder: 'one' | 'two' | 'three') => {
    const confirmed = window.confirm("Are you sure you want to delete this reminder?");
    if (!confirmed) return;

    try {
      const profileId = loggedInUserId;
      // Prepare new reminders array
      let newReminders = [reminderOne, reminderTwo, reminderThree];
      if (reminder === 'one') newReminders[0] = "";
      if (reminder === 'two') newReminders[1] = "";
      if (reminder === 'three') newReminders[2] = "";
      const joined = joinReminders(newReminders[0], newReminders[1], newReminders[2]);
      const response = await axios.put(`${baseURL}/profile/${profileId}/reminder`, { note: joined });
      if ( newReminders[0] === "" && newReminders[1] === "" && newReminders[2] === "") {
        const response = await axios.delete(`${baseURL}/profile/${profileId}/reminder`);
      }
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to delete reminder");
      }
      setReminderOne(newReminders[0]);
      setReminderTwo(newReminders[1]);
      setReminderThree(newReminders[2]);
      setRemOneEditorOn(false);
      setRemTwoEditorOn(false);
      setRemThreeEditorOn(false);
      // Optionally hide the reminder card if deleted
      if (reminder === 'one') setShowReminderOne(false);
      if (reminder === 'two') setShowReminderTwo(false);
      if (reminder === 'three') setShowReminderThree(false);
      // Hide overlay if all reminders are gone
      if (!newReminders[0] && !newReminders[1] && !newReminders[2]) setshowOverlay(false);
      setActiveIndex(null);
    } catch (error) {
      console.error("Error deleting Reminder:", error);
      alert("Failed to delete Reminder.");
    }
  };

  const deleteAllReminders = async () => {
    try {
      const profileId = loggedInUserId;
      const response = await axios.delete(`${baseURL}/profile/${profileId}/reminder`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to delete all reminders");
      }
      setReminderOne("");
      setReminderTwo("");
      setReminderThree("");
      setRemOneEditorOn(false);
      setRemTwoEditorOn(false);
      setRemThreeEditorOn(false);
      setShowReminderOne(false);
      setShowReminderTwo(false);
      setShowReminderThree(false);
      setshowOverlay(false);
      setActiveIndex(null);
    } catch (error) {
      console.error("Error deleting all reminders:", error);
      alert("Failed to delete all reminders.");
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);
  

  return (    
    <div id="ah-content-container">
      {fifiAlert.show && (
        <FifiAlert
          message={fifiAlert.message}
          onClose={() => setFifiAlert({ show: false, message: "" })}
        />
      )}
      {showOverlay && (
        <div id="reminder-overlay">
          {/* Show Delete and Close All only if at least two reminders have text */}
          {([reminderOne, reminderTwo, reminderThree].filter(r => !!r && r !== "Loading...").length >= 2) && (
          <div>
            <button id="close-all" onClick={closeAllReminders}>Close All</button>
            <button
              id="delete-all"
              onClick={async () => {
                if (window.confirm("Are you sure you want to delete all reminders?")) {
                  await deleteAllReminders();
                }
              }}
            >
              Delete All
            </button>
          </div>
          )}
          {showReminderOne && (
          <div id="reminder-one" className="reminders">
            <button id="trashcan-one" className="trashcan" onClick={() => deleteReminder('one')}></button>
            <button className="close-btn" onClick={() => closeReminder('one')}>X</button>
            <h2>Reminder</h2>
            {RemOneEditor ? (
              <div>
                <textarea
                  className="reminder-textarea"
                  value={editedReminderOne}
                  onChange={(e) => setEditedReminderOne(e.target.value)}
                  onFocus={() => {
                    if (editedReminderOne === "Type something...") setEditedReminderOne("");
                  }}
                />
                <button className="btn btn-primary my-2" onClick={() => saveReminder('one')}>Save</button>
              </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: reminderOne }}></div>
              )}
          </div>
          )}
          {showReminderTwo && (
          <div id="reminder-two" className="reminders">
            <button id="trashcan-two" className="trashcan" onClick={() => deleteReminder('two')}></button>
            <button className="close-btn" onClick={() => closeReminder('two')}>X</button>
            <h2>Reminder</h2>
            {RemTwoEditor ? (
              <div>            
                <textarea className="reminder-textarea"
                  value={editedReminderTwo}
                  onChange={(e) => setEditedReminderTwo(e.target.value)} 
                  onFocus={() => {
                    if (editedReminderTwo === "Type something...") setEditedReminderTwo("");
                  }}
                />
                <button className="btn btn-primary my-2" onClick={()=>saveReminder('two')}>Save</button>
              </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: reminderTwo }}></div>
              )}
          </div>
          )}
          {showReminderThree && (
          <div id="reminder-three" className="reminders">
            <button id="trashcan-three" className="trashcan" onClick={() => deleteReminder('three')}></button>
            <button className="close-btn" onClick={() => closeReminder('three')}>X</button>
            <h2>Reminder</h2>
            {RemThreeEditor ? (
              <div>            
                <textarea className="reminder-textarea"
                  value={editedReminderThree}
                  onChange={(e) => setEditedReminderThree(e.target.value)} 
                  onFocus={() => {
                    if (editedReminderThree === "Type something...") setEditedReminderThree("");
                  }}
                />
                <button className="btn btn-primary my-2" onClick={()=>saveReminder('three')}>Save</button>
              </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: reminderThree }}></div>
              )}
          </div>
          )}
        </div>
      )}
      <div id="welcome-note">
        {WNEditor ? (
          <div>
            <ReactQuill
              value={editedWelcomeNote}
              onChange={(value) => setEditedWelcomeNote(value)}
            />
            <button className="btn btn-primary my-2" onClick={saveWelcomeNote}>Save</button>
            <button  className="btn btn-outline-primary mx-2" 
              onClick={async () => {              
                if (window.confirm("Are you sure you want the default Welcome Note?")) {
                  await defaultWelcomeNote();
                }
              }}
            >
              Default
            </button>
            <button 
              className="btn btn-danger mx-2" 
              onClick={() => {
                setWNEditorOn(false);
                setActiveIndex(null);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: welcomeNote }}></div>
        )}
      </div>
      <div id="to-do-list">
      {TDLEditor ? (
          <div>
            <ReactQuill
              value={editedToDoList}
              onChange={(value) => setEditedToDoList(value)}
            />
            <button className="btn btn-primary my-2" onClick={saveToDoList}>Save</button>
            <button  className="btn btn-outline-primary mx-2" 
              onClick={async () => {              
                if (window.confirm("Are you sure you want the default To-Do List?")) {
                  await defaultToDoList();
                }
              }}
            >
              Default
            </button>
            <button className="btn btn-danger mx-2" 
                    onClick={() => {
                      setTDLEditorOn(false);
                      setActiveIndex(null);
                    }}>Cancel</button>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: toDoList }}></div>
        )}
      </div>
    </div>   
  );
};

export default AdminHome;