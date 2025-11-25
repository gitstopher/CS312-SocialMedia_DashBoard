import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Schedule.css';

const Schedule = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    content: '',
    date: '',
    platform: '',
    mediaType: '',
    mediaUrl: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.content && form.date && form.platform) {
      setPosts([...posts, form]);
      setForm({
        content: '',
        date: '',
        platform: '',
        mediaType: '',
        mediaUrl: ''
      });
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
          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
          >
            <option value="">Select Platform</option>
            <option value="Instagram">Instagram</option>
            <option value="Twitter">Twitter (X)</option>
            <option value="Facebook">Facebook</option>
          </select>
          <select
            name="mediaType"
            value={form.mediaType}
            onChange={handleChange}
          >
            <option value="">Select Media Type</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="reel">Reel</option>
          </select>
          <input
            type="url"
            name="mediaUrl"
            value={form.mediaUrl}
            onChange={handleChange}
            placeholder="Optional: Link to content"
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
                <strong>{post.date} – {post.platform}</strong>
                <p>{post.content}</p>
                {post.mediaType === 'image' && post.mediaUrl && (
                  <img
                    src={post.mediaUrl}
                    alt="Scheduled media"
                    style={{ maxWidth: '100%', borderRadius: '6px', marginTop: '10px' }}
                  />
                )}
                {post.mediaType === 'video' && post.mediaUrl && (
                  <video
                    controls
                    style={{ maxWidth: '100%', borderRadius: '6px', marginTop: '10px' }}
                  >
                    <source src={post.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {post.mediaType === 'reel' && post.mediaUrl && (
                  <p style={{ marginTop: '10px' }}>
                    <em>Reel link:</em>{' '}
                    <a href={post.mediaUrl} target="_blank" rel="noopener noreferrer">
                      {post.mediaUrl}
                    </a>
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;