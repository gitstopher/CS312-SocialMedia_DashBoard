const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const router = express.Router();

// PostgreSQL connection pool (use env vars for security)
const pool = new Pool({
  user: process.env.DB_USER || "my_dashboard_user",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "my_dashboard",
  password: process.env.DB_PASS || "mypassword",
  port: process.env.DB_PORT || 5432,
});

// Secret key (⚠️ move to .env in production)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ------------------ SIGN-UP ------------------
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// ------------------ SIGN-IN ------------------
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Server error during signin" });
  }
});

module.exports = router;
