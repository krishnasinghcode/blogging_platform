import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Changed from creator to author
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the post
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // References to Comment model
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
