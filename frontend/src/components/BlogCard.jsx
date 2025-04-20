import React from "react";
import { Link } from "react-router-dom";
import options from "../assets/options.png";

const BlogCard = ({ blog }) => {
    return (
        <div className="relative flex max-w-3xl mx-auto my-6 p-6 bg-white shadow-md rounded-xl">
            <Link to={`/blog/${blog._id}`} className="flex-grow">
                <div>
                    <h1 className="text-2xl font-semibold mb-2">{blog.title}</h1>
                    <p className="text-sm text-gray-500 mb-3">By {blog.author.name}</p>
                    <p className="text-gray-800">
                        {blog.content.length > 150
                            ? blog.content.slice(0, 150) + "..."
                            : blog.content}
                    </p>
                </div>
            </Link>

            <div className="absolute top-4 right-4 cursor-pointer">
                <img className="h-[30px]" src={options} alt="Options" />
            </div>
        </div>
    );
};

export default BlogCard;
