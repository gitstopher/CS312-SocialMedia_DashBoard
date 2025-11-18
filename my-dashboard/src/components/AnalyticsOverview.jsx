import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsOverview = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    // Fetch metrics from backend
    axios.get('http://localhost:4000/api/metrics')
      .then(res => setMetrics(res.data))
      .catch(err => console.error("Error fetching metrics:", err));
  }, []);

  return (
    <div className="analytics-overview">
      <div className="metric">
        <h3>Followers</h3>
        <p>{metrics ? metrics.followers : "Loading..."}</p>
      </div>
      <div className="metric">
        <h3>Engagement</h3>
        <p>{metrics ? `${metrics.engagement}%` : "Loading..."}</p>
      </div>
      <div className="metric">
        <h3>Scheduled Posts</h3>
        <p>{metrics ? metrics.scheduledPosts : "Loading..."}</p>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
