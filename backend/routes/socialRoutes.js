import express from 'express';
import axios from 'axios'; // Used to call Facebook's API
import { pool } from '../db.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// GET /api/social/feed - Fetch combined feed from all linked accounts
router.get('/feed', verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Get all linked accounts for this user
    const accountsResult = await pool.query(
      "SELECT platform, access_token FROM accounts WHERE user_id = $1",
      [userId]
    );

    const accounts = accountsResult.rows;
    let allPosts = [];

    // 2. Loop through accounts and fetch data
    for (const account of accounts) {
      if (account.platform === 'facebook') {
        try {
          // Call Facebook Graph API
          // We ask for: message (text), created_time, and permalink_url (link to post)
          const fbResponse = await axios.get(
            `https://graph.facebook.com/me/feed?fields=id,message,created_time,permalink_url,full_picture&access_token=${account.access_token}`
          );

          const fbPosts = fbResponse.data.data.map(post => ({
            id: post.id,
            platform: 'facebook',
            content: post.message || '(No text content)', // Handle image-only posts
            image: post.full_picture, // Show image if available
            date: post.created_time,
            url: post.permalink_url,
            type: 'facebook' // For your filter logic
          }));

          allPosts = [...allPosts, ...fbPosts];
        } catch (fbError) {
          console.error("Error fetching Facebook feed:", fbError.response?.data || fbError.message);
          // Don't crash the whole feed just because FB failed; just log it
        }
      }
      // You can add 'else if (account.platform === 'instagram')' here later
    }

    // 3. Sort posts by date (newest first)
    allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(allPosts);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching feed" });
  }
});

export default router;