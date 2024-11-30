import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import '../styles/HomePage.css';
import logo from '../assets/Logo.png';
import Lake from '../assets/Lake.png';

function HomePage() {
  const [menuOpen] = useState(false);
  const navigate = useNavigate();  

  const handleStartMonitoring = () => {
    navigate('/main');
  };

  return (
    <div className="home-page">
      <header className="header-bar">
        <img src={logo} className="header-logo" alt="ALGSAT logo" />
        <h1>~ALGSAT</h1>
        <nav className={`menu ${menuOpen ? 'active' : ''}`}>
          <ul className="menu-list">
            <li><Link to="/home">Home Page</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </nav>
      </header>

      <div className="picture-container">
        <img src={Lake} alt="Lake view" className="lake-image" />
        <div className="overlay-text">
          <h2>Protect Your Fish & Prevent Algal Blooms with the Touch of your Fingertips</h2>
          <button className="start-button" onClick={handleStartMonitoring}>
            Start Monitoring Now!
          </button>
        </div>
      </div>

      <div className="contact-us">
        <h2>Contact Us</h2>
        <div className="contact-icons">
          <a href="mailto:info@algsat.com" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-envelope" title="Email"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube" title="YouTube"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook" title="Facebook"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github" title="Github"></i>
          </a>
        </div>
      </div>

      <div className="info-container">
        <h2>About Us</h2>
        <p>
          We are a group of passionate innovators dedicated to harnessing the
          power of technology for environmental sustainability. Our mission is
          to develop cutting-edge solutions that address pressing ecological
          challenges, particularly in water quality monitoring and management.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
