// middleware/session.js

// In-memory session store (swap with Redis or DB later for persistence)
const sessions = new Map();

function sessionMiddleware(req, res, next) {
  // Log request method and path
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

  // Look for a session ID in headers (e.g., "x-session-id")
  const sessionId = req.headers["x-session-id"];

  if (sessionId && sessions.has(sessionId)) {
    // Attach existing session data to the request
    req.session = sessions.get(sessionId);
  } else {
    // Initialize a new empty session object
    req.session = {};
  }

  // Helper: allow routes to set/update session data
  req.saveSession = (data) => {
    if (!sessionId) {
      // Generate a simple session ID if none provided
      const newId = Math.random().toString(36).substring(2);
      sessions.set(newId, data);
      res.setHeader("x-session-id", newId); // return ID to client
    } else {
      sessions.set(sessionId, data);
    }
  };

  next();
}

module.exports = sessionMiddleware;
