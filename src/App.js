// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DynamicPage from './pages/DynamicPage';
import { fetchPages } from './services/api';
import './App.css';

function App() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of pages to build the navigation
    const getPages = async () => {
      try {
        const response = await fetchPages();
        setPages(response.data);
      } catch (error) {
        console.error("Failed to fetch pages:", error);
      } finally {
        setLoading(false);
      }
    };

    getPages();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading Site...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar pages={pages} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:slug" element={<DynamicPage />} />
          </Routes>
        </main>
        {/* You could add a <Footer /> component here */}
      </div>
    </Router>
  );
}

export default App;
