import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ActivityFeed from '../components/ActivityFeed';
import AnalyticsOverview from '../components/AnalyticsOverview';
import '../styles/Home.css';

const Home = () => {
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const posts = [
    { type: 'instagram', content: ' insta post: test' },
    { type: 'twitter', content: ' twitter(x) post: test' },
    { type: 'video', content: ' Product demo reel uploaded.' },
    { type: 'reel', content: ' Behind the scenes reel.' },
    { type: 'facebook', content: ' Facebook post: Community event update.' },
  ];

  const filteredPosts =
    filter === 'all' ? posts : posts.filter((post) => post.type === filter);

  return (
    <div className="home-container">
      <Navbar />
      <main className="home-main">
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

        {/* Toggle button for small screens */}
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className={`filter-buttons ${showFilters ? 'visible' : ''}`}>
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('instagram')}>Instagram</button>
          <button onClick={() => setFilter('twitter')}>Twitter</button>
          <button onClick={() => setFilter('video')}>Videos</button>
          <button onClick={() => setFilter('reel')}>Reels</button>
          <button onClick={() => setFilter('facebook')}>Facebook</button>
        </div>

        <div className="feed-list">
          {filteredPosts.length === 0 ? (
            <p>No posts available for this filter.</p>
          ) : (
            filteredPosts.map((post, index) => (
              <div key={index} className="feed-item">
                {post.content}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;