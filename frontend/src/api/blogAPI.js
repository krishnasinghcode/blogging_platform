// src/api/blogAPI.js
import axios from "axios"
import API from './axios.js'

export const fetchAllBlogs = async () => {
  try {
    const token = localStorage.getItem("access");

    const response = await API.get("/blogs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error.response?.data || error.message);
    throw error;
  }
};

export const createBlog = async (newBlog) => {
  try {
    const response = await API.post("/blogs/create", newBlog);
    console.log("Blog created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchBlogById = async (_id) => {
  const token = localStorage.getItem("access");

  const response = await API.get(`/blogs/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data;
};


export const fetchUserBlogs = async () => {
  try {
    const token = localStorage.getItem("access");

    const res = await API.get("/blogs/myblogs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching user blogs:", err.response?.data || err);
    return [];
  }
};
