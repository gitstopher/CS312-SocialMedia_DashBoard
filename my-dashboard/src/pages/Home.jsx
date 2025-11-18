import React from 'react';
import ActivityFeed from '../components/ActivityFeed';
import AnalyticsOverview from '../components/AnalyticsOverview';
import CalendarView from '../components/CalendarView';
import '../styles/Home.css';

const Home = () => (
  <div className="home-container">
    <h1>Hello Dashboard</h1>

    <main className="home-main">
      <section className="activity-section">
        <ActivityFeed />
      </section>

      <section className="analytics-calendar-section">
        <h2>Quick Analytics Overview</h2>
        <AnalyticsOverview />

        <h2>Post Scheduling Calendar</h2>
        <CalendarView />
      </section>
    </main>
  </div>
);

export default Home;
