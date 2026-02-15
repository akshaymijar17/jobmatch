import React from 'react';

const CompanyInsights = ({ company, analysis }) => {
    return (
        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
            <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg text-blue-600 dark:text-blue-300 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Company Insight & Action Plan</h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700">
                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Why {company || 'The Company'}?</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
                    "{analysis}"
                </p>
            </div>
        </div>
    );
};

export default CompanyInsights;
