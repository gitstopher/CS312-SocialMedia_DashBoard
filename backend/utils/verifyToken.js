import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    let token = null;

    // 1. Check for token in the Authorization Header (Standard API calls)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2. Check for token in the URL Query (Special case for "Connect Facebook" link)
    else if (req.query.token) {
      token = req.query.token;
    }

    // If no token found, stop here
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    // 3. Verify the token using your secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach the user info to the request object so routes can use it
    req.user = verified;
    
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(403).json({ message: "Invalid Token" });
  }
};