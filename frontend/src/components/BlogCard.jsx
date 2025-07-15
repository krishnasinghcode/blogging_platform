import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <div className="card bg-base-200 shadow-xl border border-base-300 mb-6">
      <div className="card-body">
        <h2 className="card-title text-primary">{blog.title}</h2>
        <p className="text-gray-400 line-clamp-3">{blog.content}</p>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-outline btn-primary btn-sm">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
