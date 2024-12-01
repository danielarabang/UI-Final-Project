import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Styles & Assets
import '../styles/SignUp.css';
import logo from '../assets/Logo.png';
import title from '../assets/Title.png';
import fisherman from '../assets/FISHERMAN.png';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    if (password === confirm) {
      const account = { email, password };
      localStorage.setItem('account', JSON.stringify(account)); 
      alert('Your account has been created successfully!');
      navigate('/');  // Redirect to the login page after successful signup
    } else {
      alert('Passwords do not match. Please try again.');
    }
  };

  const redirectToLogin = () => {
    navigate('/');  // Ensure this navigates to the login page
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
            <form onSubmit={handleSignupSubmit}>
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
              <label>Confirm Password</label>
              <input 
                type="password" 
                placeholder="Confirm your password" 
                value={confirm} 
                onChange={(e) => setConfirm(e.target.value)} 
              />
              <button type="submit" className="login-button">Create an Account</button>
            </form>
            <p className="signup-text">
              Already have an account? 
              <span onClick={redirectToLogin} className="login-link"> Log In</span>
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

export default SignUp;