import React from 'react';
import Navbar from '../components/Navbar';
import ActivityFeed from '../components/ActivityFeed';
import AnalyticsOverview from '../components/AnalyticsOverview';
import '../styles/Home.css';

const Home = () => (
  <div className="home-container">
    <Navbar />
    <main className="home-main">
      <section className="activity-section">
        <h2>Activity Feed</h2>
        <ActivityFeed />
      </section>
      <section className="analytics-section">
        <h2>Quick Analytics Overview</h2>
        <AnalyticsOverview />
      </section>
    </main>
  </div>
);

export default Home;