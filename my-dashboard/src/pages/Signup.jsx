import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  return (
    <div className="signup-container">
      {/* Navbar with Home Arrow */}
      <nav className="signup-navbar">
        <Link to="/" className="home-link">← Home</Link>
      </nav>

      <div className="signup-card">
        <h2>Create Account</h2>
        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Choose a username" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Create a password" />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" placeholder="Re-enter your password" />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;