import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Report() {
  const [formData, setFormData] = useState({
    location: '',
    disaster: '',
    status: '',
    description: ''
  });
  const [currentLocation, setCurrentLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`
        )
          .then((response) => response.json())
          .then((data) => {
            const location = data.results[0]?.formatted_address || 'Unknown Location';
            setCurrentLocation(location);
          })
          .catch((error) => {
            console.error('Error fetching location:', error);
          });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Report submitted:', data);
        navigate('/');
      })
      .catch((error) => console.error('Error submitting report:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="disaster-form">
      <h1 className="title">Report a Disaster</h1>

      <label htmlFor="location" className="label">Name of Location</label>
      <select
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="dropdown"
      >
        <option value="">Select Location</option>
        <option value="Lucknow,UP,India">Lucknow, UP, India</option>
        <option value="City2, State2, Country2">City2, State2, Country2</option>
        <option value="City3, State3, Country3">City3, State3, Country3</option>
      </select>

      <label className="label">Location</label>
      <div className="location-box">
        <span>{currentLocation || 'Fetching current location..'}</span>
      </div>

      <label htmlFor="disaster" className="label">Name of Disaster</label>
      <select
        id="disaster"
        name="disaster"
        value={formData.disaster}
        onChange={handleChange}
        className="dropdown"
      >
        <option value="">Select Disaster</option>
        <option value="Earthquake">Earthquake</option>
        <option value="Flood">Flood</option>
        <option value="Tornado">Tornado</option>
        <option value="Wildfire">Wildfire</option>
      </select>

      <label htmlFor="status" className="label">Status</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="dropdown"
      >
        <option value="">Select Status</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Under Control">Under Control</option>
        <option value="Resolved">Resolved</option>
      </select>

      <label htmlFor="description" className="label">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="textarea"
        placeholder="Provide details of the disaster"
      />

      <button type="submit" className="submit-btn">Report Disaster</button>
    </form>
  );
}

export default Report;
