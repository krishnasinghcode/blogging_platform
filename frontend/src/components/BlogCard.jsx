import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-200 shadow-xl border border-base-300 mb-6">
      <div className="card-body">
        <h1 className="card-title text-primary">{blog.title}</h1>
        <p className="text-sm text-gray-500">{new Date(blog.updatedAt).toLocaleDateString()}</p>
        <p className="text-gray-400 line-clamp-3">{blog.content}</p>
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
