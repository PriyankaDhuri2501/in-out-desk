import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assume that you will add a separate CSS file for better styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple validation for username and password
    if (username === 'Pratham' && password === 'Pratham@123') {
      alert('Welcome to In-Out Desk!');
      navigate('/main');  // Navigate to the main page on successful login
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to In-Out Desk</h2>
        
        {/* Username Input */}
        <div className="input-container">
          <label>Username</label>
          <input 
            type="text" 
            placeholder="Enter username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>

        {/* Password Input */}
        <div className="input-container">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        {/* Error Message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Login Button */}
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>
    </div>
  );
};

export default Login;
