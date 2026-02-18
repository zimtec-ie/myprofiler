import React, { useState } from 'react';
import './css/Login.css'; 
import logo from './assets/logo.jpg';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <a className="navbar-brand" href="http://zimtec.ie/products.html#myProfiler" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Logo" className="login-logo" />
        </a>
        <form onSubmit={handleSubmit} id="login-form">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
           <button type="submit" id="login-button">Login</button>
        </form>
        <p style={{paddingTop: '20px'}}>Setup an account? Contact <a href="http://zimtec.ie#contact">Support</a></p>
      </div>
      <p style={{marginBottom: '5px'}}>© {new Date().getFullYear()} powered by ZIMTEC. All rights reserved.</p>
    </div>   
  );
};

export default Login;