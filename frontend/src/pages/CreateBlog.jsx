import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField"; // Adjust path as necessary
import back from '../assets/back.png'
import { createBlog } from "../api/blogAPI"; // Import the function

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBlog = {
            title,
            content,
        };

        try {
            // Call the createBlog function from blogService
            await createBlog(newBlog);

            console.log("Blog created successfully");
            navigate("/dashboard"); // Redirect to the dashboard
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    };

    const handleBackButton = () => {
        navigate("/dashboard");
    };

    return (
        <div>
            <div>
                <img className="ml-36 mt-10 h-[40px]" onClick={handleBackButton} src={back}></img>
            </div>
            <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                        type="text"
                        name="title"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <InputField
                        type="text"
                        name="content"
                        label="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-background text-text px-4 py-2 rounded border-2 hover:border-accent"
                    >
                        Create Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
