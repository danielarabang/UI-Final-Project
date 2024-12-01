import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your global styles
import App from './App'; // Ensure the path to App.js is correct
import reportWebVitals from './reportWebVitals'; // Optional for performance tracking

const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure there's a div with id="root" in public/index.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance measuring (optional, can be safely removed if not needed)
reportWebVitals(console.log);
