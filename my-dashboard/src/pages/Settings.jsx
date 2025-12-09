import React, { useState, useEffect } from 'react';
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

  // 1. FETCH STATUS ON LOAD
  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:4000/api/oauth/status", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.linked) {
          setLinkedAccounts({
            facebook: data.linked.includes("facebook"),
            twitter: data.linked.includes("twitter"),
            instagram: data.linked.includes("instagram"),
          });
        }
      } catch (err) {
        console.error("Failed to load status", err);
      }
    };
    fetchStatus();
  }, []);

  // 2. HANDLE LINKING (Redirect to Backend)
  const handleLink = (platform) => {
    const token = localStorage.getItem("token");
    if (platform === 'facebook') {
      // Redirect browser to the Backend OAuth route
      window.location.href = `http://localhost:4000/api/oauth/facebook?token=${token}`;
    } else {
      alert(`${platform} linking is not implemented yet!`);
    }
  };

  // 3. HANDLE UNLINKING (API Call)
  const handleUnlink = async (platform) => {
    const token = localStorage.getItem("token");
    if (!window.confirm(`Are you sure you want to unlink ${platform}?`)) return;

    try {
      const res = await fetch(`http://localhost:4000/api/oauth/unlink/${platform}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        // Update UI locally to reflect the change
        setLinkedAccounts(prev => ({ ...prev, [platform]: false }));
      } else {
        alert("Failed to unlink account.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const togglePreference = (pref) => {
    setPreferences({ ...preferences, [pref]: !preferences[pref] });
  };

  return (
    <div className="settings-container">
      <nav className="settings-navbar">
        <Link to="/" className="home-link">← Home</Link>
      </nav>

      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your social accounts and preferences</p>
      </div>

      <div className="settings-card">
        <h3>Linked Accounts</h3>

        {/* FACEBOOK */}
        <div className="account-toggle">
          <span>Facebook</span>
          {linkedAccounts.facebook ? (
            <button 
              className="link-button unlink" 
              onClick={() => handleUnlink('facebook')}
              style={{ backgroundColor: '#dc3545', color: 'white' }}
            >
              Unlink Facebook
            </button>
          ) : (
            <button 
              className="link-button" 
              onClick={() => handleLink('facebook')}
            >
              Link Facebook
            </button>
          )}
        </div>

        {/* TWITTER (Placeholder) */}
        <div className="account-toggle">
          <span>Twitter</span>
          <button className="link-button" disabled>
            Coming Soon
          </button>
        </div>

        {/* INSTAGRAM (Placeholder) */}
        <div className="account-toggle">
          <span>Instagram</span>
           <button className="link-button" disabled>
            Coming Soon
          </button>
        </div>
      </div>

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