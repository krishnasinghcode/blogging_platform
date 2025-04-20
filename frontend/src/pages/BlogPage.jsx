// src/pages/BlogPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Simulated backend data (replace with actual fetch)
const mockBlogs = [
    {
        _id: "1",
        title: "The Power of Clean Code",
        author: { _id: "u1", name: "Krishna Kumar" },
        content: "Writing clean code is essential for maintainability, scalability, and teamwork. Here's how you can write cleaner code every day...",
    },
    {
        _id: "2",
        title: "Mastering the MERN Stack",
        author: { _id: "u2", name: "Ritika Mehta" },
        content: "The MERN stack is powerful and flexible. In this article, we explore how MongoDB, Express, React, and Node.js come together...",
    }
];

const BlogPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        // Simulated fetch by ID
        const foundBlog = mockBlogs.find((b) => b._id === id);
        setBlog(foundBlog);
    }, [id]);

    if (!blog) return <div className="text-center mt-10">Loading blog...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-md rounded-xl">
            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
            <p className="text-sm text-gray-500 mb-4">By {blog.author.name}</p>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {blog.content}
            </p>
        </div>
    );
};

export default BlogPage;
