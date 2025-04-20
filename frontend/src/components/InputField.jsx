import React from "react";

const InputField = ({ type, name, label, value, onChange }) => {
    return (
        <div className="relative">
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required
                placeholder=" "
                className="block w-full px-0 py-2 border-0 border-b-2 border-gray-300 bg-transparent focus:border-lightAccent focus:outline-none focus:ring-0 text-text peer"
                autoComplete={name}
            />
            <label
                htmlFor={name}
                className="form-label absolute text-sm text-accent duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:text-lightAccent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {label}
            </label>
        </div>
    );
};

export default InputField;
