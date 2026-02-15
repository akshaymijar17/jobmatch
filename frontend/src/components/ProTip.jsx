import React from 'react';

const ProTip = ({ tip }) => {
    if (!tip) return null;

    return (
        <div className="bg-blue-600 dark:bg-blue-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">✨</span>
                    <h3 className="font-bold text-lg">Pro Tip</h3>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">
                    {tip}
                </p>
            </div>
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500 rounded-full opacity-50 blur-xl"></div>
        </div>
    );
};

export default ProTip;
