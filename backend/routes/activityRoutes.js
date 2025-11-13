import express from "express";
import { pool } from "../db.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// Fetch all activity
router.get("/", verifyToken, async (req, res) => {
  const { platform, type } = req.query;
  let query = "SELECT * FROM activities WHERE user_id = $1";
  let params = [req.user.id];

  if (platform) {
    query += " AND platform = $2";
    params.push(platform);
  }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch activity" });
  }
});

// Add new activity
router.post("/", verifyToken, async (req, res) => {
  const { platform, content, type } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "INSERT INTO activities (user_id, platform, content, type, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
      [userId, platform, content, type]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to insert activity" });
  }
});

export default router;
