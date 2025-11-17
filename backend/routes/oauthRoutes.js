import express from "express";
import { pool } from "../db.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// Link account
router.post("/link", verifyToken, async (req, res) => {
  const { platform, token } = req.body;  // Remove user_id from body
  const userId = req.user.id;             // Use authenticated user

  try {
    await pool.query(
      `INSERT INTO accounts (user_id, platform, access_token)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, platform)
       DO UPDATE SET access_token = EXCLUDED.access_token`, // Update if already linked
      [userId, platform, token]
    );
    res.json({ success: true, message: `${platform} linked successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to link account" });
  }
});

// Unlink account
router.delete("/unlink/:platform", verifyToken, async (req, res) => {
  const { platform } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "DELETE FROM accounts WHERE user_id = $1 AND platform = $2",
      [userId, platform]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: `No linked ${platform} account found` });
    }

    res.json({ success: true, message: `${platform} unlinked successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to unlink account" });
  }
});

export default router;
