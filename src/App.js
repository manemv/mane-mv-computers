// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DynamicPage from './pages/DynamicPage';
import CourseDetailPage from './pages/CourseDetailPage'; // Import the new page
import { fetchPages } from './services/api';
import './App.css';

function App() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const getPages = async () => {
      try {
        const response = await fetchPages();
        setPages(response.data);
      } catch (error) {
        console.error('Failed to fetch pages for navbar', error);
      }
    };
    getPages();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar pages={pages} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Route for individual course pages */}
            <Route path="/courses/:slug" element={<CourseDetailPage />} />
            {/* This will handle /about-us, /courses (the list), etc. */}
            <Route path="/:slug" element={<DynamicPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
