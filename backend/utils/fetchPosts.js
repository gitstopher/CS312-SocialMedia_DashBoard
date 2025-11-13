// backend/utils/fetchPosts.js
import axios from "axios";

export const fetchPosts = async (platform, token) => {
  switch (platform.toLowerCase()) {
    case "facebook":
      // Example: Facebook Graph API
      const fbRes = await axios.get(`https://graph.facebook.com/me/posts?access_token=${token}`);
      return fbRes.data.data; // array of posts

    case "twitter":
      // Example: Twitter API v2
      const twRes = await axios.get(`https://api.twitter.com/2/users/me/tweets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return twRes.data.data;

    case "instagram":
      const igRes = await axios.get(`https://graph.instagram.com/me/media?fields=id,caption,timestamp&access_token=${token}`);
      return igRes.data.data;

    default:
      return [];
  }
};
