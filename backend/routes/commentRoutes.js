import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { getCommentsForBlog, createComment, deleteComment } from "../controllers/commentController.js";

const router = express.Router();

router.get("/:blogId", getCommentsForBlog); // Fetch all comments for a blog
router.post("/:blogId", authenticateUser, createComment); // Create a comment
router.delete("/:commentId", authenticateUser, deleteComment); // Delete a comment

export default router;
