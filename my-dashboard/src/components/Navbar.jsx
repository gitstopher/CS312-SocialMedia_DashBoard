import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // 1. Check if user is logged in
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    console.error("User data error");
  }

  // 2. Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          My Social Dashboard
        </Link>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        
        {user ? (
          <>
            {/* USER GREETING: Non-clickable style */}
            <li className="user-greeting">
              Hi, {user.username}
            </li>
            
            <li><Link to="/analytics" onClick={() => setIsOpen(false)}>Analytics</Link></li>
            <li><Link to="/schedule" onClick={() => setIsOpen(false)}>Schedule</Link></li>
            <li><Link to="/settings" onClick={() => setIsOpen(false)}>Settings</Link></li>
            
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
            <li><Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;