import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <h1>Social Dashboard</h1>
    <ul className="nav-links">
       
    <li><Link to="/">Home</Link></li>
    <li><Link to="/analytics">Analytics</Link></li>
    <li><Link to="/schedule">Schedule</Link></li>
     <li><Link to="/signup">Sign Up</Link></li>
    <li><Link to="/settings">Settings</Link></li>
    </ul>
  </nav>
);

export default Navbar;