import React from 'react';

const Textarea = ({
  name,
  label = '',
  placeholder = '',
  value,
  onChange,
  className = '',
  rows = 6,
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={name} className="label text-sm font-medium text-white">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`textarea textarea-bordered w-full ${className}`}
      />
    </div>
  );
};

export default Textarea;
