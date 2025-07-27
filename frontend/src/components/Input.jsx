import React from 'react';

const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  label = '',
  autoComplete = ''
}) => {
  return (
    <div className="form-control w-full">
      {label && <label className="label text-sm font-medium text-white">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input input-bordered w-full ${className}`}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default Input;
