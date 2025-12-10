import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ActivityFeed from '../components/ActivityFeed';
import AnalyticsOverview from '../components/AnalyticsOverview';
import '../styles/Home.css';

const Home = () => {
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [posts, setPosts] = useState([]); // <--- Changed to State
  const [loading, setLoading] = useState(true); // <--- Loading state

  const location = useLocation();
  const navigate = useNavigate();

  // 1. Get User
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem('user')) || {};
  } catch (error) {
    console.error("Error parsing user data", error);
  }

  // 2. Check Facebook Link Status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('status') === 'linked') {
      alert("✅ Facebook Account Linked Successfully!");
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  // 3. NEW: Fetch Real Feed from Backend
  useEffect(() => {
    const fetchFeed = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/api/social/feed', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch feed");
        }
      } catch (err) {
        console.error("Error connecting to server", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  // Filter Logic
  const filteredPosts =
    filter === 'all' ? posts : posts.filter((post) => post.type === filter);

  return (
    <div className="home-container">
      <Navbar />

      <main className="home-main">
        <div className="dashboard-card welcome-banner" style={{ marginBottom: '20px', textAlign: 'center' }}>
            <h1>Hello, {user.username || 'Guest'} 👋</h1>
            <p>Here is what's happening with your accounts today.</p>
        </div>

        <section className="dashboard-card activity-section">
          <h2>Activity Feed</h2>
          <ActivityFeed />
        </section>

        <section className="dashboard-card analytics-section">
          <h2>Quick Analytics Overview</h2>
          <AnalyticsOverview />
        </section>
      </main>

      {/* Social Feed Card */}
      <section className="social-feed-card">
        <h2>Social Media Feed</h2>

        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className={`filter-buttons ${showFilters ? 'visible' : ''}`}>
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'facebook' ? 'active' : ''} onClick={() => setFilter('facebook')}>Facebook</button>
          {/* Keep placeholders for now */}
          <button className={filter === 'instagram' ? 'active' : ''} onClick={() => setFilter('instagram')}>Instagram</button>
        </div>

        <div className="feed-list">
          {loading ? (
            <p>Loading your feed...</p>
          ) : filteredPosts.length === 0 ? (
            <p>No posts found. (Try posting something on your Facebook test page!)</p>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="feed-item" style={{ borderLeft: '4px solid #1877F2', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888' }}>
                   <span className={`badge ${post.type}`}>{post.type.toUpperCase()}</span>
                   <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                
                <p style={{ marginTop: '10px', fontSize: '15px' }}>{post.content}</p>
                
                {post.image && (
                  <img src={post.image} alt="Post content" style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '10px' }} />
                )}

                <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '10px', fontSize: '12px', color: '#1877F2' }}>
                  View on Facebook →
                </a>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;