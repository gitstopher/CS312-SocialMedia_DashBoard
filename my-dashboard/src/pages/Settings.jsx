import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Settings.css';

const Settings = () => {
  const [linkedAccounts, setLinkedAccounts] = useState({
    facebook: false,
    twitter: false,
    instagram: false,
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
  });

  const toggleAccount = (platform) => {
    setLinkedAccounts({
      ...linkedAccounts,
      [platform]: !linkedAccounts[platform],
    });
  };

  const togglePreference = (pref) => {
    setPreferences({
      ...preferences,
      [pref]: !preferences[pref],
    });
  };

  return (
    <div className="settings-container">
      {/* Navbar with Home Arrow */}
      <nav className="settings-navbar">
        <Link to="/" className="home-link">← Home</Link>
      </nav>

      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your social accounts and preferences</p>
      </div>

      {/* Social Accounts Section */}
      <div className="settings-card">
        <h3>Linked Accounts</h3>
        <div className="account-toggle">
          <label>
            <input
              type="checkbox"
              checked={linkedAccounts.facebook}
              onChange={() => toggleAccount('facebook')}
            />
            Facebook
          </label>
        </div>
        <div className="account-toggle">
          <label>
            <input
              type="checkbox"
              checked={linkedAccounts.twitter}
              onChange={() => toggleAccount('twitter')}
            />
            Twitter
          </label>
        </div>
        <div className="account-toggle">
          <label>
            <input
              type="checkbox"
              checked={linkedAccounts.instagram}
              onChange={() => toggleAccount('instagram')}
            />
            Instagram
          </label>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="settings-card">
        <h3>Preferences</h3>
        <div className="pref-toggle">
          <label>
            <input
              type="checkbox"
              checked={preferences.notifications}
              onChange={() => togglePreference('notifications')}
            />
            Enable Notifications
          </label>
        </div>
        <div className="pref-toggle">
          <label>
            <input
              type="checkbox"
              checked={preferences.darkMode}
              onChange={() => togglePreference('darkMode')}
            />
            Dark Mode
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;