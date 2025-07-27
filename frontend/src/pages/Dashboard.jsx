import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { fetchAllBlogs } from "../api/blogAPI";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchAllBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-base-content text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary-content">
        All Blogs
      </h1>

      {blogs.length > 0 ? (
        blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
      ) : (
        <p className="text-center text-neutral-content">No blogs available.</p>
      )}
    </div>
  );
};

export default Dashboard;
