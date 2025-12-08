import cron from "node-cron";
import { pool } from "../db.js";

const fakePublish = async (platform, content) => {
  console.log(`>>> Publishing to ${platform}: ${content}`);
  return true; 
};

cron.schedule("* * * * *", async () => {
  console.log(" Checking pending scheduled posts...");

  const result = await pool.query(`
    SELECT * FROM scheduled_posts
    WHERE status = 'pending'
    AND scheduled_datetime <= NOW()
  `);

  for (const post of result.rows) {
    try {
      const ok = await fakePublish(post.platform, post.content);

      await pool.query(
        `UPDATE scheduled_posts SET status=$1 WHERE id=$2`,
        [ok ? "published" : "failed", post.id]
      );

      await pool.query(
        `INSERT INTO post_history (scheduled_post_id, action)
         VALUES ($1, $2)`,
        [post.id, ok ? "published" : "failed"]
      );

    } catch (err) {
      console.error("Publish error:", err);
    }
  }
});
