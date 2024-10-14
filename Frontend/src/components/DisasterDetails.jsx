import React from 'react';
import { useLocation } from 'react-router-dom';

function DisasterDetails() {
  const location = useLocation();
  const { location: disasterLocation, disaster, status, description } = location.state;

  return (
    <div>
      <h2>Disaster Details</h2>
      <p><strong>Location:</strong> {disasterLocation}</p>
      <p><strong>Disaster:</strong> {disaster}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Description:</strong> {description || 'No description provided'}</p>
    </div>
  );
}

export default DisasterDetails;
