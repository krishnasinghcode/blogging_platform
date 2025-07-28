// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import { fetchUserBlogs } from '../api/blogAPI';

export const Profile = () => {
  const { user } = useAuth();
  const [userBlogs, setUserBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    const loadUserBlogs = async () => {
      try {
        const data = await fetchUserBlogs();
        setUserBlogs(data);
      } catch (error) {
        console.error("Failed to load user blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    loadUserBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {user?.username || 'User'}!</h1>

      <div className="text-base-content space-y-1">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Joined:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
      </div>

      <LogoutButton />

      <div className="pt-8">
        <h2 className="text-2xl font-semibold mb-4">My Blogs</h2>

        {loadingBlogs ? (
          <p>Loading your blogs...</p>
        ) : userBlogs.length > 0 ? (
          userBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p>You haven’t written any blogs yet.</p>
        )}
      </div>
    </div>
  );
};
