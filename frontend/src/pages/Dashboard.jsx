// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { fetchAllBlogs } from "../api/blogAPI";

const Dashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlogs = async () => {
            const token = localStorage.getItem("token"); // or from context/state
            try {
                const data = await fetchAllBlogs(token);
                setBlogs(data);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };
    
        loadBlogs();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="px-4">
            {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
    );
};

export default Dashboard;
