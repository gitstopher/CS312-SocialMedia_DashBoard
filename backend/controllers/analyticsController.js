import { pool } from "../db.js";

export const getAnalytics = async (req, res) => {
  try {
    const { range } = req.query; // "7", "30", "90"

    let interval = "7 days";
    if (range === "30") interval = "30 days";
    if (range === "90") interval = "90 days";

    // Total Followers
    const followers = await pool.query(`
      SELECT SUM(followers_count) AS total_followers
      FROM daily_metrics
      WHERE date >= NOW() - INTERVAL '${interval}'
    `);

    // Average Engagement
    const engagement = await pool.query(`
      SELECT AVG(engagement_rate) AS avg_engagement
      FROM daily_metrics
      WHERE date >= NOW() - INTERVAL '${interval}'
    `);

    // Total Reach
    const reach = await pool.query(`
      SELECT SUM(reach) AS total_reach
      FROM daily_metrics
      WHERE date >= NOW() - INTERVAL '${interval}'
    `);

    // Posts Published
    const posts = await pool.query(`
      SELECT SUM(posts_count) AS total_posts
      FROM daily_metrics
      WHERE date >= NOW() - INTERVAL '${interval}'
    `);

    // Top 5 Posts
    const topPosts = await pool.query(`
      SELECT *
      FROM post_performance
      ORDER BY engagement_rate DESC
      LIMIT 5
    `);

    res.json({
      followers: followers.rows[0]?.total_followers || 0,
      engagement_rate: engagement.rows[0]?.avg_engagement || 0,
      reach: reach.rows[0]?.total_reach || 0,
      posts_published: posts.rows[0]?.total_posts || 0,
      top_posts: topPosts.rows,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Analytics fetch error" });
  }
};
