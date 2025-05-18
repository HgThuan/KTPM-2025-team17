import React from 'react';
import './Button.css';

const Button = ({ children, onClick, className = '', id, type = 'button' }) => {
  return (
    <button
      id={id}
      type={type}
      className={`base-button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;