import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './internal.css';

const InwardUpload = () => {
    const [inwardType, setInwardType] = useState('Internal');
    const [letterDate, setLetterDate] = useState('');
    const [receivedDate, setReceivedDate] = useState('');
    const [subject, setSubject] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [address, setAddress] = useState('');
    const [briefDescription, setBriefDescription] = useState('');
    const [descriptionLanguage, setDescriptionLanguage] = useState('English');
    const [numberOfPages, setNumberOfPages] = useState('');
    const [pdfPath, setPdfPath] = useState(null);
    const [remark, setRemark] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    // Handle language change for external links
    const handleLanguageChange = (e) => {
        setDescriptionLanguage(e.target.value);
        if (e.target.value === 'Hindi/Marathi') {
            window.open('http://quillpad.com');
        }
    };

    // Handle file selection
    const handleFileChange = (e) => {
        setPdfPath(e.target.files[0]);
    };

    // Handle form submission and file upload
    const handleUpload = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('letterDate', letterDate);
        data.append('receivedDate', receivedDate);
        data.append('subject', subject);
        data.append('from', from);
        data.append('to', to);
        data.append('address', address);
        data.append('description', briefDescription);
        data.append('language', descriptionLanguage);
        data.append('pages', numberOfPages);
        data.append('pdfPath', pdfPath);
        data.append('remark', remark);

        try {
            const response = await axios.post('http://localhost:5000/api/internal/inward', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Display success message and navigate to main page
            window.alert('Inward data uploaded successfully!');
            console.log(response.data);
            navigate('/main');
        } catch (err) {
            console.error('Error uploading inward', err);
            setMessage('Failed to upload inward data.');
            window.alert('Failed to upload inward data.');
        }
    };

    const goBackToMain = () => {
        navigate('/main');
    };

    return (
        <div className={`inward-upload-container ${inwardType === 'Internal' ? 'form-internal' : 'form-external'}`}>
            <h2>Inward Upload</h2>

            {/* Inward type selection */}
            <div className="form-group">
                <label>Select Inward Type:</label>
                <div className="radio-buttons">
                    <label>
                        <input
                            type="radio"
                            value="Internal"
                            checked={inwardType === 'Internal'}
                            onChange={(e) => setInwardType(e.target.value)}
                        />
                        Internal
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="External"
                            checked={inwardType === 'External'}
                            onChange={(e) => setInwardType(e.target.value)}
                        />
                        External
                    </label>
                </div>
            </div>

            {/* Form fields */}
            <form onSubmit={handleUpload}>
                <div className="form-group">
                    <label>Select Letter Date:</label>
                    <input type="date" value={letterDate} onChange={(e) => setLetterDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Select Received Date:</label>
                    <input type="date" value={receivedDate} onChange={(e) => setReceivedDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Subject:</label>
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>From:</label>
                    <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>To:</label>
                    <input type="text" value={to} onChange={(e) => setTo(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Brief Description:</label>
                    <input type="text" value={briefDescription} onChange={(e) => setBriefDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Language:</label>
                    <select value={descriptionLanguage} onChange={handleLanguageChange}>
                        <option value="English">English</option>
                        <option value="Hindi/Marathi">Hindi/Marathi</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Number of Pages:</label>
                    <input type="number" value={numberOfPages} onChange={(e) => setNumberOfPages(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Choose PDF Path:</label>
                    <input type="file" onChange={handleFileChange} required />
                </div>
                <div className="form-group">
                    <label>Remark:</label>
                    <input type="text" value={remark} onChange={(e) => setRemark(e.target.value)} />
                </div>
                <button type="submit">Upload Inward</button>
            </form>

            {/* Display message after submission */}
            {message && <div>{message}</div>}
            <button onClick={goBackToMain}>Go Back to Main</button>
        </div>
    );
};

export default InwardUpload;
