import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-brand">My Social Dashboard</div>

      {/* Hamburger button */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Nav links */}
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
           <li><Link to="/">Home</Link></li>
    <li><Link to="/analytics">Analytics</Link></li>
    <li><Link to="/schedule">Schedule</Link></li>
     <li><Link to="/signup">Sign Up</Link></li>
    <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;