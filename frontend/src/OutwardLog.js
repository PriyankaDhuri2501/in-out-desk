import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './OutwardLog.css'; // Updated CSS file

const OutwardLog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('ID');
  const [pdfId, setPdfId] = useState('');
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [deleteId, setDeleteId] = useState('');

  // Initialize useNavigate hook
  const navigate = useNavigate();

  // Handlers for various actions
  const handleSearch = () => {
    console.log(`Searching for ${searchQuery} by ${searchCriteria}`);
  };

  const handleRefresh = () => {
    console.log('Refreshing data...');
  };

  const handleDownloadPdf = () => {
    console.log(`Downloading PDF with ID: ${pdfId}`);
  };

  const handleUpdatePdf = () => {
    console.log(`Updating PDF with ID: ${pdfId}`, selectedPdf);
  };

  const handleDeleteRow = () => {
    console.log(`Deleting row with ID: ${deleteId}`);
  };

  const handleExportExcel = () => {
    console.log('Exporting data as Excel...');
  };

  const handleUpdateAll = () => {
    console.log('Updating all rows...');
  };

  const handleSendMail = () => {
    console.log('Sending mail...');
  };

  // Handler to navigate back to Main.js
  const handleBackToMain = () => {
    navigate('/main'); // Navigate to Main.js
  };

  return (
    <div className="outward-log">
      <h2>Outward Log Management</h2>

      {/* Search Section */}
      <div className="search-section">
        <label>Search By:</label>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Enter search query" 
        />
        <div className="radio-buttons">
          <label>
            <input 
              type="radio" 
              value="ID" 
              checked={searchCriteria === 'ID'} 
              onChange={(e) => setSearchCriteria(e.target.value)} 
            /> 
            ID
          </label>
          <label>
            <input 
              type="radio" 
              value="Subject" 
              checked={searchCriteria === 'Subject'} 
              onChange={(e) => setSearchCriteria(e.target.value)} 
            /> 
            Subject
          </label>
          <label>
            <input 
              type="radio" 
              value="From" 
              checked={searchCriteria === 'From'} 
              onChange={(e) => setSearchCriteria(e.target.value)} 
            /> 
            From
          </label>
        </div>
        <button className="refresh-button" onClick={handleRefresh}>Refresh</button>
      </div>

      {/* PDF Handling Section */}
      <div className="pdf-handling-section">
        <h3>Download/Update PDF</h3>
        <label>Enter PDF ID:</label>
        <input 
          type="text" 
          value={pdfId} 
          onChange={(e) => setPdfId(e.target.value)} 
          placeholder="Enter PDF ID" 
        />
        <input 
          type="file" 
          accept=".pdf" 
          onChange={(e) => setSelectedPdf(e.target.files[0])} 
        />
        <div className="button-group">
          <button className="download-button" onClick={handleDownloadPdf}>Download PDF</button>
          <button className="update-button" onClick={handleUpdatePdf}>Update PDF</button>
        </div>
      </div>

      {/* Delete and Export Section */}
      <div className="delete-export-section">
        <h3>Delete Row / Export Data</h3>
        <label>Enter ID to Delete:</label>
        <input 
          type="text" 
          value={deleteId} 
          onChange={(e) => setDeleteId(e.target.value)} 
          placeholder="Enter ID" 
        />
        <div className="button-group">
          <button className="delete-button" onClick={handleDeleteRow}>Delete</button>
          <button className="export-button" onClick={handleExportExcel}>Export as Excel</button>
        </div>
      </div>

      {/* Update All Section */}
      <div className="update-all-section">
        <button className="update-all-button" onClick={handleUpdateAll}>Click to Update All</button>
      </div>

      {/* Send Mail Section */}
      <div className="send-mail-section">
        <button className="send-mail-button" onClick={handleSendMail}>Click to Send Mail</button>
      </div>

      {/* Back to Main Section */}
      <div className="back-to-main-section">
        <button className="back-to-main-button" onClick={handleBackToMain}>Back to Main</button>
      </div>
    </div>
  );
};

export default OutwardLog;
