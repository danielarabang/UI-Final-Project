import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './Logo.png';
import fisherman from './FISHERMAN.png';
import title from './Title.png';
import Lake from './Lake.png';

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
              <span onClick={redirectToSignup} className="signup-link">Sign Up</span>
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

function SignupPage() {
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
      navigate('/login'); 
    } else {
      alert('Passwords do not match. Please try again.');
    }
  };

  const redirectToLogin = () => {
    navigate('/');
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
              <span onClick={redirectToLogin} className="login-link">Log In</span>
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
        {/* Navigation Menu */}
        <nav className={`menu ${menuOpen ? 'active' : ''}`}>
          <ul className="menu-list">
            <li><Link to="/home">Home Page</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </nav>
      </header>

      {/* Picture Container with Overlayed Text */}
      <div className="picture-container">
        <img src={Lake} alt="Lake view" className="lake-image" />
        <div className="overlay-text">
          <h2>Protect Your Fish & Prevent Algal Blooms with the Touch of your Fingertips</h2>
          <button className="start-button" onClick={handleStartMonitoring}>
            Start Monitoring Now!
          </button>
        </div>
      </div>

      {/* Contact Us Bar */}
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

      {/* Info Container */}
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

function MainPage() {
  const [menuOpen] = useState(false);

  return (
    <div className="main-page">
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

      {/* Sidebar Section */}
      <div className="main-content">
        <aside className="sidebar">
          <h2>Parameters</h2>
          <div className="parameter-list">
            <label>
              <input type="checkbox" /> Total Suspended Solids
            </label>
            <label>
              <input type="checkbox" /> Dissolved Oxygen
            </label>
            <label>
              <input type="checkbox" /> Phosphate
            </label>
            <label>
              <input type="checkbox" /> Nitrate
            </label>
          </div>

          {/* Notices Section */}
          <div className="notices">
            <h3>Notices:</h3>
            <div className="notice-item">
              <details>
                <summary>High TSS Levels in Station 1</summary>
                <p>Details about the high levels detected.</p>
              </details>
            </div>
            <p className="bloom-coverage">
              <strong>30%</strong> ALGAL BLOOM COVERAGE
            </p>
          </div>
        </aside>

        {/* Map Section */}
        <main className="map-section">
          <div className="map-container">
            {/*<img src="path-to-map-image.png" alt="Map" className="map-image" />*/}
          </div>
        </main>
      </div>
    </div>
  );
}

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
            <img src="path-to-vincent-image.jpg" alt="Vincent Maverick Clarito" />
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
            <img src="path-to-kenneth-image.jpg" alt="Kenneth Estacion" />
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
            <img src="path-to-paulo-image.jpg" alt="Paulo Mendoza" />
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
            <img src="path-to-daniela-image.jpg" alt="Daniela Marie Rabang" />
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


// AppWrapper Component
export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/main" element={<MainPage />} /> 
        <Route path="/about-us" element={<AboutUs />} /> 
      </Routes>
    </Router>
  );
}