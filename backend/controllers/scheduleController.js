import { pool } from "../db.js";

export const createScheduledPost = async (req, res) => {
  try {
    const { user_id, platform, content, media_urls, scheduled_datetime } = req.body;

    const result = await pool.query(
      `INSERT INTO scheduled_posts (user_id, platform, content, media_urls, scheduled_datetime)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, platform, content, media_urls, scheduled_datetime]
    );

    await pool.query(
      `INSERT INTO post_history (scheduled_post_id, action)
       VALUES ($1, 'created')`,
      [result.rows[0].id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating scheduled post" });
  }
};

export const getScheduledPosts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM scheduled_posts
      ORDER BY scheduled_datetime ASC
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: "Error retrieving scheduled posts" });
  }
};

export const updateScheduledPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, content, media_urls, scheduled_datetime, status } = req.body;

    const result = await pool.query(
      `UPDATE scheduled_posts
       SET platform=$1, content=$2, media_urls=$3, scheduled_datetime=$4, status=$5
       WHERE id=$6 RETURNING *`,
      [platform, content, media_urls, scheduled_datetime, status, id]
    );

    await pool.query(
      `INSERT INTO post_history (scheduled_post_id, action)
       VALUES ($1, 'edited')`,
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: "Error updating post" });
  }
};

export const deleteScheduledPost = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `INSERT INTO post_history (scheduled_post_id, action)
       VALUES ($1, 'deleted')`,
      [id]
    );

    await pool.query(`DELETE FROM scheduled_posts WHERE id=$1`, [id]);

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Error deleting scheduled post" });
  }
};
