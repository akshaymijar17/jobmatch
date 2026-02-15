import React from 'react';

const Button = ({ children, onClick, disabled, className = "" }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800 dark:disabled:text-gray-400 disabled:cursor-not-allowed transition-colors ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
