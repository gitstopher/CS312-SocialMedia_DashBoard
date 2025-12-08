import express from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// --------------------
// SIGNUP
// --------------------
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );

    const newUser = result.rows[0];

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// --------------------
// LINK SOCIAL ACCOUNT
// --------------------
router.post("/link", verifyToken, async (req, res) => {
  const { platform, token } = req.body;
  const userId = req.user.id;

  try {
    await pool.query(
      `INSERT INTO accounts (user_id, platform, access_token)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, platform)
       DO UPDATE SET access_token = EXCLUDED.access_token`,
      [userId, platform, token]
    );
    res.json({ success: true, message: `${platform} linked successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to link account" });
  }
});

// --------------------
// UNLINK SOCIAL ACCOUNT
// --------------------
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

// --------------------
// LOGIN
// --------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ user: { id: user.id, username: user.username, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});


export default router;
