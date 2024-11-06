import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './Homepage.js';
import UserPage from './UserPage.js';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/user">User Page</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
