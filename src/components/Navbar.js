// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ pages }) => {
  // Sort pages to show 'Courses' first after 'Home', then alphabetically
  const sortedPages = [...pages].sort((a, b) => {
    if (a.slug === 'courses') return -1; // 'courses' comes first
    if (b.slug === 'courses') return 1;
    return 0;
  });

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          MaNe MV Computers
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className="nav-links" end>
              Home
            </NavLink>
          </li>
          {sortedPages.map((page) => (
            <li className="nav-item" key={page.id}>
              <NavLink to={`/${page.slug}`} className="nav-links">
                {page.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
