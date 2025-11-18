require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Custom middleware
const requestLogger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const sessionMiddleware = require("./middleware/session");
const authenticateToken = require("./middleware/auth");

// Routes
const authRoutes = require("./routes/auth");
const feedRoutes = require("./routes/feed");

const app = express();

// ------------------ Global Middleware ------------------
app.use(cors());
app.use(express.json());
app.use(requestLogger);       // Logs every request
app.use(sessionMiddleware);   // Attaches session data

// ------------------ Routes ------------------
app.use("/api/auth", authRoutes);
app.use("/api/feed", authenticateToken, feedRoutes); // Protected feed

// Temporary public feed route for testing
app.get("/api/feed/public", (req, res) => {
  res.json([
    { id: 1, platform: "Instagram", text: "New follower: @alex_dev" },
    { id: 2, platform: "Facebook", text: "@you posted a new story" },
    { id: 3, platform: "Twitter", text: "3 likes on your latest post" },
  ]);
});

// Health check route (for debugging)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ------------------ Error Handler ------------------
app.use(errorHandler);

// ------------------ Server Startup ------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
