import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Sidebar.css';

const Sidebar = ({ onNavigate }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Logout handler function
  const handleLogout = () => {
    // Clear authentication data (if any), e.g., from localStorage or sessionStorage
    localStorage.removeItem('authToken'); // Example: removing auth token
    sessionStorage.removeItem('userSession'); // Example: removing session

    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="sidebar">
      <img src="/path/to/icon.png" alt="Icon" className="icon" />
      <h2>In-Out Desk</h2>
      <ul>
        <li onClick={() => onNavigate('/inward-upload')}>Inward Upload</li>
        <li onClick={() => onNavigate('/outward-upload')}>Outward Upload</li>
        <li onClick={() => onNavigate('/Internal-Inward-Log')}>Internal Inward Log</li>
        <li onClick={() => onNavigate('/External-Inward-Log')}>External Inward Log</li>
        <li onClick={() => onNavigate('/Outward-Log')}>Outward Log</li>
        <li>Admin Control</li>
        {/* Logout option */}
        <li className="logout" onClick={handleLogout}>LOGOUT</li>
      </ul>
    </div>
  );
};

export default Sidebar;
