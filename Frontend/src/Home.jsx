import React, { useState, useEffect } from 'react';

function Home() {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    // Fetch reported disasters from the server
    fetch('http://localhost:5000/reports')
      .then((response) => response.json())
      .then((data) => setDisasters(data))
      .catch((error) => console.error('Error fetching reports:', error));
  }, []);

  return (
    <div className="home">
      <h1>Reported Disasters</h1>
      {disasters.length === 0 ? (
        <p>No disasters reported yet.</p>
      ) : (
        <ul>
          {disasters.map((report, index) => (
            <li key={index}>
              <strong>Location:</strong> {report.location}<br />
              <strong>Disaster:</strong> {report.disaster}<br />
              <strong>Status:</strong> {report.status}<br />
              <strong>Description:</strong> {report.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
