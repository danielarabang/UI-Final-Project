import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../assets/Logo.png';
import title from '../assets/Title.png';
import fisherman from '../assets/FISHERMAN.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const storedAccount = JSON.parse(localStorage.getItem('account'));

    if (storedAccount && storedAccount.email === email && storedAccount.password === password) {
      alert('Login successful!');
      navigate('/home');
    } else {
      alert('No account found with these credentials. Please sign up first.');
    }
  };

  const redirectToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="app-container">
      <header className="header-bar">
        <img src={logo} className="header-logo" alt="logo" />
        <h1>~ALGSAT</h1>
      </header>

      <div className="content-container">
        <div className="login-section">
          <div className="login-form">
            <form onSubmit={handleLoginSubmit}>
              <label>Email ID</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button type="submit" className="login-button">Login</button>
              <p className="forgot-password">Forgot Password?</p>
            </form>
            <p className="signup-text">
              No account yet? 
              <span onClick={redirectToSignup} className="signup-link"> Sign Up</span>
            </p>
          </div>
        </div>

        <div className="info-section">
          <img src={title} alt="Title" />
          <div className="illustration">
            <img src={fisherman} alt="Fisherman illustration" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
