import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/Input";
import Button from "../components/Button";
import back from '../assets/back.png';
import { createBlog } from "../api/blogAPI";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = { title, content };

    try {
      await createBlog(newBlog);
      console.log("Blog created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleBackButton = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-base-100 px-4 py-8">
      <div className="mb-6">
        <img
          src={back}
          alt="Back"
          className="h-10 ml-36 cursor-pointer"
          onClick={handleBackButton}
        />
      </div>

      <div className="max-w-3xl mx-auto bg-base-200 p-8 rounded-xl shadow-xl border border-base-300">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Create a New Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            type="text"
            name="title"
            label="Title"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputField
            type="textarea"
            name="content"
            label="Content"
            placeholder="Write your blog content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            type="submit"
            text="Create Blog"
            variant="primary"
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
