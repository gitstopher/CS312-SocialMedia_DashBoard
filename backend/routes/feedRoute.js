import express from "express";
import { pool } from "../db.js";
import { verifyToken } from "../utils/verifyToken.js";
import { fetchPosts } from "../utils/fetchPosts.js";
import { normalizeData } from "../utils/normalizeData.js";

const router = express.Router();

// GET /feed
router.get("/", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    //  Fetch linked accounts for the user
    const accountsResult = await pool.query(
      "SELECT platform, access_token FROM accounts WHERE user_id = $1",
      [userId]
    );

    const linkedAccounts = accountsResult.rows;

    let allPosts = [];

    // Fetch posts from each linked platform
    for (const account of linkedAccounts) {
      const posts = await fetchPosts(account.platform, account.access_token);
      const normalizedPosts = normalizeData(posts, account.platform);
      allPosts.push(...normalizedPosts);
    }

    //  Fetch user activity from activities table
    const activitiesResult = await pool.query(
      "SELECT id, platform, content, type, created_at FROM activities WHERE user_id = $1",
      [userId]
    );

    const normalizedActivities = activitiesResult.rows.map((a) => ({
      id: a.id,
      platform: a.platform,
      content: a.content,
      type: a.type,
      timestamp: a.created_at,
      source: "activity",
    }));

    //  Combine all posts + activities
    const combinedFeed = [...allPosts, ...normalizedActivities];

    //  sort by timestamp descending (latest first)
    combinedFeed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json({ user: req.user.email, feed: combinedFeed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch combined feed" });
  }
});

export default router;
