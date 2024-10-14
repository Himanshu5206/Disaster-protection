import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import Report from './Report';
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      {/* Header section with navigation buttons */}
      <header className="header">
        <button className="header-btn" onClick={() => navigate('/')}>Home</button>
        <button className="header-btn" onClick={() => navigate('/report')}>Report</button>
      </header>

      {/* Routing Setup */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </div>
  );
}

export default App;
