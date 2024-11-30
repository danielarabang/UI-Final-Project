import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AboutUs.css';
import logo from '../assets/Logo.png'; 

function AboutUs() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menuOpen state
  };

  return (
    <div className="aboutus-page">
      {/* Header Section */}
      <header className="header-bar">
        <img src={logo} className="header-logo" alt="ALGSAT logo" />
        <h1>~ALGSAT</h1>
        {/* Navigation Menu */}
        <button onClick={toggleMenu} className="menu-toggle">
          ☰ {/* You can use a hamburger icon or any symbol for the menu */}
        </button>
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
        <h2>Team 63</h2>
        <p>
          We are a group of passionate innovators dedicated to harnessing the power of technology for environmental sustainability.
          Our mission is to develop cutting-edge solutions that address pressing ecological challenges, particularly in water quality monitoring and management.
        </p>
      </div>

      {/* Person Containers */}
      <div className="team-members">
        <div className="person-container">
          <div className="person-image">
            <img src="./assets/images/vincent-image.jpg" alt="Vincent Maverick Clarito" />
          </div>
          <div className="person-info">
            <h2>Vincent Maverick Clarito</h2>
            <p>Email: qvmdclarito@tip.edu.ph</p>
            <p>Contact number: [Insert Number]</p>
            <p>Elective: Intelligent Systems</p>
          </div>
        </div>

        <div className="person-container">
          <div className="person-image">
            <img src="./assets/images/kenneth-image.jpg" alt="Kenneth Estacion" />
          </div>
          <div className="person-info">
            <h2>Kenneth Estacion</h2>
            <p>Email: qkestacion@tip.edu.ph</p>
            <p>Contact number: [Insert Number]</p>
            <p>Elective: Data Science</p>
          </div>
        </div>

        <div className="person-container">
          <div className="person-image">
            <img src="./assets/images/paulo-image.jpg" alt="Paulo Mendoza" />
          </div>
          <div className="person-info">
            <h2>Paulo Mendoza</h2>
            <p>Email: qpdcmendoza@tip.edu.ph</p>
            <p>Contact number: [Insert Number]</p>
            <p>Elective: Data Science</p>
          </div>
        </div>

        <div className="person-container">
          <div className="person-image">
            <img src="./assets/images/daniela-image.jpg" alt="Daniela Marie Rabang" />
          </div>
          <div className="person-info">
            <h2>Daniela Marie Rabang</h2>
            <p>Email: qdmdrabang@tip.edu.ph</p>
            <p>Contact number: 09453181290</p>
            <p>Elective: System Administration</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
