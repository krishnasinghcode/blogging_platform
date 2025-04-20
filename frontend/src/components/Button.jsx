import React from "react";

const Button = ({ text, onClick, type = "button", disabled }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`w-full bg-accent px-4 py-2 mt-6 text-text rounded-md ${
                disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80"
            } transition-all duration-300`}
        >
            {text}
        </button>
    );
};

export default Button;
