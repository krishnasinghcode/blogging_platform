import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] }],
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
