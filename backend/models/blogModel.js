import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Changed from creator to author
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }], // Default to empty array
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] }], // Default to empty array
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
