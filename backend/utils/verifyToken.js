// backend/utils/verifyToken.js
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";

const googleClient = new OAuth2Client();
const FB_APP_ID = process.env.FB_APP_ID;
const FB_APP_SECRET = process.env.FB_APP_SECRET;

// Detect token type heuristically
const detectProvider = (token) => {
  if (!token) return null;

  // Google ID tokens are JWTs (3 parts separated by .)
  if (token.split(".").length === 3) return "google";

  // Facebook tokens often numeric + long string, simplistic detection
  if (/^\d+/.test(token)) return "facebook";

  // Otherwise assume Twitter for now
  return "twitter";
};

// Google token verification
const verifyGoogleToken = async (token) => {
  const ticket = await googleClient.verifyIdToken({ idToken: token });
  const payload = ticket.getPayload();
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    provider: "google",
  };
};

// Facebook token verification
const verifyFacebookToken = async (token) => {
  const appAccessToken = `${FB_APP_ID}|${FB_APP_SECRET}`;
  const url = `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${appAccessToken}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.data || !data.data.is_valid) throw new Error("Invalid Facebook token");

  const userInfoRes = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
  const userInfo = await userInfoRes.json();

  return {
    id: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
    provider: "facebook",
  };
};

// Twitter token verification (simplified)
const verifyTwitterToken = async (token) => {
  // For real apps, call Twitter API to verify OAuth2 token
  return {
    id: token, // Just attach token as user id for now
    provider: "twitter",
  };
};

// Main middleware
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Invalid token format" });

    const provider = detectProvider(token);
    let user;

    switch (provider) {
      case "google":
        user = await verifyGoogleToken(token);
        break;
      case "facebook":
        user = await verifyFacebookToken(token);
        break;
      case "twitter":
        user = await verifyTwitterToken(token);
        break;
      default:
        return res.status(400).json({ message: "Unsupported or unrecognized OAuth token" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("OAuth verification failed:", err.message);
    return res.status(403).json({ message: "Invalid or expired OAuth token" });
  }
};
