/*
 * myProfiler by ZIMTEC | Web Developers
 * Description: Customizable Profile Web Application
 * CRUD Template: by Arjuncodes
 * Date Created: ... in progress ...
 * 
 */


import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
