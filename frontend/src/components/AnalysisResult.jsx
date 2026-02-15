import React from 'react';
import CircularScore from './CircularScore';
import StrengthsGaps from './StrengthsGaps';
import CompanyInsights from './CompanyInsights';
import ResumeEdits from './ResumeEdits';

const AnalysisResult = ({ result }) => {
    if (!result) return null;

    const {
        match_score,
        job_title,
        company,
        location,
        job_type,
        key_strengths,
        experience_gaps,
        company_analysis,
        recommended_edits,
        job_url
    } = result;

    return (
        <div className="space-y-6">
            {/* Header: Score & Job Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-shrink-0">
                    <CircularScore score={match_score} />
                </div>
                <div className="flex-grow text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1 text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        {company || 'Company Name'}
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
                        {job_title || 'Job Title'}
                    </h2>
                    <div className="text-gray-600 dark:text-gray-300 mb-4 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
                        <span>{location || 'Location'}</span>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <span>{job_type || 'Job Type'}</span>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${match_score >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>
                            {match_score >= 80 ? 'Strong Match' : match_score >= 50 ? 'Potential Match' : 'Low Match'}
                        </span>
                        <a href={job_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                            View Job &rarr;
                        </a>
                    </div>
                </div>
            </div>

            {/* Strengths & Gaps Grid */}
            <StrengthsGaps strengths={key_strengths} gaps={experience_gaps} />

            {/* Company Insight */}
            <CompanyInsights company={company} analysis={company_analysis} />

            {/* Resume Edits */}
            <ResumeEdits edits={recommended_edits} />

        </div>
    );
};

export default AnalysisResult;
