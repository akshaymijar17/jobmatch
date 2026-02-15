import React from 'react';

const StrengthsGaps = ({ strengths, gaps }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Strengths */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400 mr-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Key Strengths</h3>
                </div>
                <div className="space-y-4">
                    {strengths && strengths.map((strength, index) => (
                        <div key={index} className="flex items-start">
                            <div className="mt-1 min-w-[20px] text-green-500 dark:text-green-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">{strength}</p>
                        </div>
                    ))}
                    {(!strengths || strengths.length === 0) && <p className="text-gray-400 text-sm italic">No specific strengths identified.</p>}
                </div>
            </div>

            {/* Experience Gaps */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400 mr-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Experience Gaps</h3>
                </div>
                <div className="space-y-4">
                    {gaps && gaps.map((gap, index) => (
                        <div key={index} className="flex items-start">
                            <div className="mt-1 min-w-[20px] text-yellow-500 dark:text-yellow-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">{gap}</p>
                        </div>
                    ))}
                    {(!gaps || gaps.length === 0) && <p className="text-gray-400 text-sm italic">No specific gaps identified.</p>}
                </div>
            </div>
        </div>
    );
};

export default StrengthsGaps;
