import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OutwardUpload.css';

const OutwardUploadForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    address: '',
    from: '',
    subject: '',
    briefDescription: '',
    numberOfPages: '',
    pdfFile: null,
    remark: '',
    letterDate: new Date().toISOString().split('T')[0], // Default to today's date
    relatedToInward: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log('Form Data Submitted:', formData);
  };

  const goBackToMain = () => {
    navigate('/main'); // Navigate to the main page
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Outward Upload</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>To:</label>
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>From:</label>
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Brief Description:</label>
          <textarea
            name="briefDescription"
            value={formData.briefDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Number of Pages:</label>
          <input
            type="number"
            name="numberOfPages"
            value={formData.numberOfPages}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Choose PDF Path:</label>
          <input
            type="file"
            name="pdfFile"
            accept="application/pdf"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Remark:</label>
          <input
            type="text"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Select Letter Date:</label>
          <input
            type="date"
            name="letterDate"
            value={formData.letterDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Is it Related to any INWARD?</label>
          <div>
            <input
              type="radio"
              name="relatedToInward"
              value="yes"
              checked={formData.relatedToInward === 'yes'}
              onChange={handleChange}
              required
            />
            <label>YES</label>
            <input
              type="radio"
              name="relatedToInward"
              value="no"
              checked={formData.relatedToInward === 'no'}
              onChange={handleChange}
              required
            />
            <label>NO</label>
          </div>
        </div>
        {/* Upload button */}
        <button type="submit" className="upload-button">Upload</button>
        
        {/* Go Back button with spacing */}
        <button type="button" className="back-button" onClick={goBackToMain}>Go Back to Main</button>
      </form>
    </div>
  );
};

export default OutwardUploadForm;
