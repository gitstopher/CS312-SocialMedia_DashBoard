import express from "express";
import {
  createScheduledPost,
  getScheduledPosts,
  updateScheduledPost,
  deleteScheduledPost
} from "../controllers/scheduleController.js";

const router = express.Router();

router.post("/", createScheduledPost);
router.get("/", getScheduledPosts);
router.put("/:id", updateScheduledPost);
router.delete("/:id", deleteScheduledPost);

export default router;
