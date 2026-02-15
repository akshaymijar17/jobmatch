import React from 'react';

const ResumeEdits = ({ edits }) => {
    if (!edits || edits.length === 0) return null;

    return (
        <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Recommended Resume Edits:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {edits.map((edit, index) => {
                    const isAdd = edit.type?.toLowerCase() === 'add';
                    const borderColor = isAdd ? 'border-blue-200 dark:border-blue-800' : 'border-purple-200 dark:border-purple-800';
                    const bgColor = isAdd ? 'bg-blue-50 dark:bg-blue-900/10' : 'bg-purple-50 dark:bg-purple-900/10';
                    const titleColor = isAdd ? 'text-blue-700 dark:text-blue-300' : 'text-purple-700 dark:text-purple-300';
                    const titleText = isAdd ? 'Add This:' : 'Adjust This:';

                    return (
                        <div key={index} className={`${bgColor} border ${borderColor} rounded-xl p-5`}>
                            <h4 className={`${titleColor} font-bold text-sm mb-2`}>{titleText}</h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                {edit.suggestion}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResumeEdits;
