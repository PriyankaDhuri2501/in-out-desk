import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InwardList = () => {
  const [inwardData, setInwardData] = useState([]); // To store the data
  const [error, setError] = useState(null); // To handle errors
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('http://localhost:5000/api/inward')  // Replace with your API endpoint
      .then(response => {
        setInwardData(response.data);  // Set the fetched data to state
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);  // The empty array ensures this runs only once, after the initial render.

  // Handle loading and error state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Render data
  return (
    <div>
      <h2>Inward Letters</h2>
      <ul>
        {inwardData.map(item => (
          <li key={item.id}>
            <h3>Subject: {item.subject}</h3>
            <p>From: {item.from}</p>
            <p>To: {item.to}</p>
            <p>Number of Pages: {item.pages}</p>
            <p>Received Date: {item.receivedDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InwardList;
