import React, { useEffect, useState } from "react";
import axios from "axios";
import './ActivityFeed.css'; // ✅ Add this if you want styling

const ActivityFeed = () => {
  const [feed, setFeed] = useState([]);
  const [filter, setFilter] = useState("All");

  // Fetch feed from backend
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/feed")
      .then((response) => {
        setFeed(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feed:", error);
      });
  }, []);

  const filteredFeed =
    filter === "All" ? feed : feed.filter((item) => item.platform === filter);

  return (
    <div className="activity-feed">
      <h2>Activity Feed</h2>

      {/* Filter Buttons */}
      <div className="filters">
        {["All", "Instagram", "Facebook", "Twitter"].map((platform) => (
          <button
            key={platform}
            className={filter === platform ? "active" : ""}
            onClick={() => setFilter(platform)}
          >
            {platform}
          </button>
        ))}
      </div>

      {/* Feed Items */}
      {filteredFeed.length === 0 ? (
        <p className="empty-feed">No activity to display.</p>
      ) : (
        <ul className="feed-list">
          {filteredFeed.map((item) => (
            <li key={item.id} className="feed-item">
              <span className="platform-tag">{item.platform}</span>
              <span className="feed-text">{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityFeed;
