import Comment from "../models/comment.js";
import Blog from "../models/blog.js";

/**
 * Create a new comment for a blog post
 */
export const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { blogId } = req.params;

        if (!content) {
            return res.status(400).json({ message: "Comment content is required" });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        const userId = req.user.id;

        // Check if the blog exists
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Create and save the comment
        const newComment = new Comment({ blog: blogId, user: userId, content });
        await newComment.save();

        // Add the comment reference to the blog
        blog.comments.push(newComment._id);
        await blog.save();

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        res.status(500).json({ message: "Error creating comment", error: error.message });
    }
};

/**
 * Delete a comment by its ID
 */
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        // Find the comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Ensure the user owns the comment
        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own comments" });
        }

        // Remove the comment from the blog's comments array
        await Blog.findByIdAndUpdate(comment.blog, { $pull: { comments: commentId } });

        // Delete the comment
        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error: error.message });
    }
};

/**
 * Fetch all comments for a blog post
 */
export const getCommentsForBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        // Find all comments associated with the given blogId
        const comments = await Comment.find({ blog: blogId })
            .populate("user", "email") // Populate user details (optional)
            .sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error: error.message });
    }
};
