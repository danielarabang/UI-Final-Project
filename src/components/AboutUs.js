import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AboutUs.css';
import logo from '../assets/Logo.png'; 
import daniela from '../assets/daniela-image.png'
import pau from '../assets/pau-image.png'
import mav from '../assets/mav-image.png'
import kenneth from '../assets/kenneth-image.png'
import FooterImage from '../assets/LagunaLake.png';  // Make sure to import your bottom image

function AboutUs() {
  const [menuOpen] = useState(false);

  return (
    <div className="aboutus-page">
      {/* Header Section */}
      <header className="header-bar">
        <img src={logo} className="header-logo" alt="ALGSAT logo" />
        <h1>~ALGSAT</h1>
        {/* Navigation Menu */}
        <nav className={`menu ${menuOpen ? 'active' : ''}`}>
          <ul className="menu-list">
            <li><Link to="/home">Home Page</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </nav>
      </header>

      {/* Details Section */}
      <div id="details" className="details-section">
        <h1>Meet Team 63!</h1>
        <p>
          We are a group of passionate innovators dedicated to harnessing the power of technology for environmental sustainability.
          Our mission is to develop cutting-edge solutions that address pressing ecological challenges, particularly in water quality monitoring and management.
        </p>
      </div>

      {/* Person Containers */}
      <div className="team-members">
        <div className="person-container">
          <div className="person-image">
            <img src={mav} className="aboutus-mav" alt="Vincent Maverick Clarito" />          </div>
          <div className="person-info">
            <h2>Vincent Maverick Clarito</h2>
            <p>Email: qvmdclarito@tip.edu.ph</p>
            <p>Contact number: 09292696071</p>
            <p>Elective: Intelligent Systems</p>
          </div>
        </div>

        <div className="person-container">
          <div className="person-image">
            <img src={kenneth} className="aboutus-kenneth" alt="Kenneth Estacion" />          </div>
          <div className="person-info">
            <h2>Kenneth Estacion</h2>
            <p>Email: qkestacion@tip.edu.ph</p>
            <p>Contact number: 09273178495</p>
            <p>Elective: Data Science</p>
          </div>
        </div>

        <div className="person-container">
          <div className="person-image">
            <img src={pau} className="aboutus-pau" alt="Paulo Mendoza" />
          </div>
          <div className="person-info">
            <h2>Paulo Mendoza</h2>
            <p>Email: qpdcmendoza@tip.edu.ph</p>
            <p>Contact number: 09152776896</p>
            <p>Elective: Data Science</p>
          </div>
        </div>

        <div className="person-container">
          <div className="person-image">
            <img src={daniela} className="aboutus-daniela" alt="Daniela Marie Rabang" />
          </div>
          <div className="person-info">
            <h2>Daniela Marie Rabang</h2>
            <p>Email: qdmdrabang@tip.edu.ph</p>
            <p>Contact number: 09453181290</p>
            <p>Elective: System Administration</p>
          </div>
        </div>
      </div>
            {/* Footer section */}
      <footer className="footer">
        <img src={FooterImage} alt="Laguna Lake view" className="footer-image" />
      </footer>
    </div>
  );
}

export default AboutUs;
