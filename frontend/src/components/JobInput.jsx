import React from 'react';

const JobInput = ({ value, onChange, disabled }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="jobUrl">
                LinkedIn Job URL
            </label>
            <input
                id="jobUrl"
                type="url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                placeholder="https://www.linkedin.com/jobs/view/..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:bg-gray-100 dark:disabled:bg-gray-700"
            />
        </div>
    );
};

export default JobInput;
