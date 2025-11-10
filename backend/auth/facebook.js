import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Save accessToken & profile info in DB
      done(null, { profile, accessToken });
    }
  )
);
