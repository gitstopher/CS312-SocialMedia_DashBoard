const express = require("express");
const router = express.Router();

// TEMP MOCK DATA (Later replace with DB and social APIs)
const feedData = [
  { id: 1, platform: "Instagram", text: "New follower: @alex_dev" },
  { id: 2, platform: "Facebook", text: "@you posted a new story" },
  { id: 3, platform: "Twitter", text: "3 likes on your latest post" },
];

router.get("/", (req, res) => {
  res.json(feedData);
});

module.exports = router;
