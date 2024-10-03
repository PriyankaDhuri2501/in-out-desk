// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import InwardUpload from './InwardUpload';  // Import the InwardUpload component
import OutwardUpload from './OutwardUpload';
import InternalInwardLog from './InternalInwardLog';
import ExternalInwardLog from './ExternalInwardLog';
import OutwardLog from './OutwardLog';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/inward-upload" element={<InwardUpload />} />  {/* Add this route */}
        <Route path="/outward-upload" element={<OutwardUpload />} />  {/* Add this route */}
        <Route path="/Internal-Inward-Log" element={<InternalInwardLog />} />  {/* Add this route */}
        <Route path="/External-Inward-Log" element={<ExternalInwardLog />} />  {/* Add this route */}
        <Route path="/Outward-Log" element={<OutwardLog />} />  {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
