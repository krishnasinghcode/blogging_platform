import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-200 shadow-xl border border-base-300 mb-6">
      <div className="card-body">
        <h1 className="card-title text-primary">{blog.title}</h1>

        {/* Author and Date */}
        <p className="text-sm text-neutral-content">
          <span className="font-semibold text-accent">
            {blog.author?.username || "Unknown Author"}
          </span>{" "}
          • {new Date(blog.updatedAt).toLocaleDateString()}
        </p>

        {/* Excerpt */}
        <p className="text-sm text-base-content/70 line-clamp-3">{blog.content}</p>

        {/* Read More */}
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-outline btn-primary btn-sm"
            onClick={() => navigate(`/blogs/${blog._id}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
