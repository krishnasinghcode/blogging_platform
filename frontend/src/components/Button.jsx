import React from 'react';

const Button = ({
  text,
  onClick,
  variant,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const Variant = variant || 'outline';

  return (
    <button
      onClick={onClick}
      className={`btn btn-${Variant} ${className}`}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
