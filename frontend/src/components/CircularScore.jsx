import React from 'react';

const CircularScore = ({ score, size = 120, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    // Color determination
    let colorClass = 'text-red-500';
    let bgColorClass = 'text-red-100 dark:text-red-900/30';

    if (score >= 80) {
        colorClass = 'text-blue-600 dark:text-blue-500';
        bgColorClass = 'text-blue-100 dark:text-blue-900/30';
    } else if (score >= 50) {
        colorClass = 'text-yellow-500';
        bgColorClass = 'text-yellow-100 dark:text-yellow-900/30';
    }

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Background Circle */}
            <svg className="transform -rotate-90 w-full h-full">
                <circle
                    className={bgColorClass}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Progress Circle */}
                <circle
                    className={`${colorClass} transition-all duration-1000 ease-out`}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
                <span className={`text-3xl font-bold ${colorClass.replace('text-', 'text-')}`}>
                    {score}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Match</span>
            </div>
        </div>
    );
};

export default CircularScore;
