// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ pages }) => {
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
          {pages.map((page) => (
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
