import express from "express";
import { pool } from "../db.js";
import { normalizeData } from "../utils/normalizeData.js";
import { verifyToken } from "../utils/verifyToken.js";
import { fetchPosts } from "../utils/fetchPosts.js"; // new helper

const router = express.Router();

router.get("/:platform/posts", verifyToken, async (req, res) => {
  const { platform } = req.params;
  const userId = req.user.id;

  try {
    // Get the user's access token for this platform
    const result = await pool.query(
      "SELECT access_token FROM accounts WHERE user_id = $1 AND platform = $2",
      [userId, platform]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: `No linked ${platform} account found` });
    }

    const token = result.rows[0].access_token;

    // Fetch posts from real API
    const posts = await fetchPosts(platform, token);

    // Normalize data
    const normalized = normalizeData(posts);

    res.json({ user: req.user.email, data: normalized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

export default router;
