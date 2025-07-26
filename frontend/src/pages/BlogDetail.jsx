import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../api/blogAPI";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await fetchBlogById(id);
        console.log(data);
        setBlog(data);
      } catch (err) {
        console.error("Error loading blog:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (!blog) return <div className="text-center mt-10 text-red-500">Blog not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-500 text-sm">
            By <span className="font-semibold">{blog.author?.name || "Unknown Author"}</span> •{" "}
            {new Date(blog.updatedAt).toLocaleDateString()}
          </p>
      </div>
      <div className="py-5">
        <p className="text-gray-600 whitespace-pre-line">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
