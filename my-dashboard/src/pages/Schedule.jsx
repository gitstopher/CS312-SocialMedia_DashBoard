import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Schedule.css';

const Schedule = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ content: '', date: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.content && form.date) {
      setPosts([...posts, form]);
      setForm({ content: '', date: '' });
    }
  };

  return (
    <div className="schedule-container">
      {/* Navbar with Home Arrow */}
      <nav className="schedule-navbar">
        <Link to="/" className="home-link">← Home</Link>
      </nav>

      <div className="schedule-header">
        <h2>Post Scheduling</h2>
        <p>Plan and schedule posts for future publication</p>
      </div>

      {/* Post Scheduling Form */}
      <div className="schedule-form-card">
        <form onSubmit={handleSubmit} className="schedule-form">
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your post content..."
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          <button type="submit">Schedule Post</button>
        </form>
      </div>

      {/* Calendar View */}
      <div className="calendar-view">
        <h3>Scheduled Posts</h3>
        <div className="calendar-grid">
          {posts.length === 0 ? (
            <p>No posts scheduled yet.</p>
          ) : (
            posts.map((post, index) => (
              <div key={index} className="calendar-card">
                <strong>{post.date}</strong>
                <p>{post.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;