// src/api/blogAPI.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // ✅ Sends cookies
});

export const fetchAllBlogs = async () => {
  try {
    const response = await API.get("/blogs");
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error.response?.data || error.message);
    throw error;
  }
};

export const createBlog = async (newBlog) => {
    try {
        const response = await axios.post("http://localhost:5000/api/blogs/create", newBlog, {
            withCredentials: true,
        });

        console.log("Blog created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating blog:", error);
        throw error;
    }
};