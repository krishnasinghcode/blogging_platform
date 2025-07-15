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
    const token = localStorage.getItem("access");
    const response = await axios.post(
      "http://localhost:5000/api/blogs/create",
      newBlog,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("Blog created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error.response?.data || error.message);
    throw error;
  }
};
