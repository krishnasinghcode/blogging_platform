import Blog from '../models/blogModel.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const userId = req.user._id;

        const blogs = await Blog.find()
            .populate("author", "username")
            .sort({ createdAt: -1 });

        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error fetching user's blogs:", error.message);
        res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
};


// Get a single blog by ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'username')
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blog", error: error.message });
    }
};

// Create a new blog
export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        const author = req.user.id;

        const newBlog = new Blog({ title, content, author });
        await newBlog.save();

        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error: error.message });
    }
};

// Update an existing blog
export const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: "Error updating blog", error: error.message });
    }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
};


export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error in getMyBlogs:", err.message);
    res.status(500).json({ error: "Failed to fetch your blogs" });
  }
};
