import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
