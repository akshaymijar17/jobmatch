import React, { useRef } from 'react';

const ResumeUpload = ({ file, onFileChange, disabled }) => {
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (disabled) return;
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileChange(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Resume (PDF)</label>
            <div
                onClick={() => !disabled && fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${disabled ? 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-not-allowed' : 'border-blue-300 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                    }`}
            >
                <input
                    type="file"
                    accept=".pdf"
                    ref={fileInputRef}
                    onChange={(e) => onFileChange(e.target.files[0])}
                    className="hidden"
                    disabled={disabled}
                />
                {file ? (
                    <div className="text-gray-700 dark:text-gray-300 font-semibold">
                        📄 {file.name}
                    </div>
                ) : (
                    <div className="text-gray-500 dark:text-gray-400">
                        <p className="mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs">PDF only</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeUpload;
