import React from 'react';
import '../styles/Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <h1>Social Dashboard</h1>
    <ul className="nav-links">
      <li><NavLink to="/" end>Home</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
      <li><NavLink to="/signup">Sign Up</NavLink></li>
      <li><NavLink to="/settings">Settings</NavLink></li>
      <li><NavLink to="/schedule">Schedule</NavLink></li>
      <li><NavLink to="/analytics">Analytics</NavLink></li>
    </ul>
  </nav>
);

export default Navbar;
