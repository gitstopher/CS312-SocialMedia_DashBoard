import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { pool } from "../db.js"; // Import your DB connection

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: "http://localhost:4000/api/oauth/facebook/callback",
      passReqToCallback: true, // IMPORTANT: Allows us to see the logged-in user
      profileFields: ["id", "emails", "name"] // Ask FB for specific data
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // 1. We need the logged-in user's ID to link the account
        // We will pass this in the 'state' parameter later
        const state = req.query.state; 
        if (!state) {
            return done(new Error("No user ID found in state"));
        }
        const userId = JSON.parse(Buffer.from(state, 'base64').toString()).id;

        // 2. Upsert (Update or Insert) into accounts table
        const query = `
          INSERT INTO accounts (user_id, platform, platform_user_id, access_token)
          VALUES ($1, 'facebook', $2, $3)
          ON CONFLICT (user_id, platform) 
          DO UPDATE SET access_token = $3;
        `;

        await pool.query(query, [userId, profile.id, accessToken]);

        return done(null, profile);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);