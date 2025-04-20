import React from "react";

const AuthFormContainer = ({ title, children }) => {
    return (
        <div className="flex items-center justify-center text-text">
            <div className="w-full max-w-md border border-lightAccent p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default AuthFormContainer;
