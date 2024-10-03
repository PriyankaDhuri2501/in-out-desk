// Main.js
import React from 'react';
import Sidebar from './Sidebar';
import './Main.css';
import { useNavigate } from 'react-router-dom';  // Import the hook
import InwardList from './components/InwardList';





const Main = () => {
  const navigate = useNavigate();

  // Function to handle navigation based on sidebar selections
  const handleNavigation = (path) => {
    navigate(path);  // Navigate to the specified path
  };

  return (
    <div className="main-container">
      <Sidebar onNavigate={handleNavigation} /> {/* Pass the function to Sidebar */}
      <div className="content">
        <h2>WELCOME: Pratham</h2>
        
      </div>
    </div>
  );
};

export default Main ;
