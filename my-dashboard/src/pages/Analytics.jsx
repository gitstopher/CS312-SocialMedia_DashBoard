import React from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import '../styles/Analytics.css';

const followerData = [
  { month: 'Jan', followers: 200 },
  { month: 'Feb', followers: 350 },
  { month: 'Mar', followers: 500 },
  { month: 'Apr', followers: 700 },
];

const engagementData = [
  { platform: 'Twitter', engagement: 4.5 },
  { platform: 'Instagram', engagement: 6.2 },
  { platform: 'Facebook', engagement: 3.8 },
];

const reachData = [
  { post: 'Post A', reach: 1200 },
  { post: 'Post B', reach: 900 },
  { post: 'Post C', reach: 1500 },
];

const demographicsData = [
  { group: '18-24', value: 30 },
  { group: '25-34', value: 40 },
  { group: '35-44', value: 20 },
  { group: '45+', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  return (
    <div className="analytics-container">
      {/* Navbar with Home Arrow */}
      <nav className="analytics-navbar">
        <Link to="/" className="home-link">← Home</Link>
      </nav>

      <div className="analytics-header">
        <h2>Analytics Dashboard</h2>
        <p>Detailed insights for each social media account</p>
      </div>

      <div className="analytics-grid">
        {/* Follower Growth */}
        <div className="analytics-card">
          <h3>Follower Growth</h3>
          <LineChart width={350} height={200} data={followerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="followers" stroke="#1e1e2f" />
          </LineChart>
        </div>

        {/* Engagement Rate */}
        <div className="analytics-card">
          <h3>Engagement Rate</h3>
          <BarChart width={350} height={200} data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="platform" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="engagement" fill="#1e1e2f" />
          </BarChart>
        </div>

        {/* Reach */}
        <div className="analytics-card">
          <h3>Reach</h3>
          <BarChart width={350} height={200} data={reachData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="post" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="reach" fill="#00C49F" />
          </BarChart>
        </div>

        {/* Demographics */}
        <div className="analytics-card">
          <h3>Demographics</h3>
          <PieChart width={350} height={200}>
            <Pie
              data={demographicsData}
              dataKey="value"
              nameKey="group"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {demographicsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;