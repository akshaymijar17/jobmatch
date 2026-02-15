import React, { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import JobInput from './components/JobInput';
import AnalysisResult from './components/AnalysisResult';
import Button from './components/Button';
import ProTip from './components/ProTip';

function App() {
  const [jobUrl, setJobUrl] = useState('');
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!jobUrl || !resume) {
      setError('Please provide both a LinkedIn Job URL and a Resume PDF.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('job_url', jobUrl);
    formData.append('resume', resume);

    try {
      // API path for DigitalOcean App Platform routing
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze. Please check the backend connection.');
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme');
    return savedMode ? savedMode === 'dark' : true;
  });

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'} py-8 px-4 sm:px-6 lg:px-8 font-sans relative`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none transition-colors"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar - Configuration */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 transition-colors border border-gray-100 dark:border-gray-700">
              <div className="mb-8">
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Job Matcher <span className="text-blue-600 dark:text-blue-400">AI</span>
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Optimize your resume for any job.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-4">Configuration</h2>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">1. Resume (PDF)</h3>
                  <ResumeUpload
                    file={resume}
                    onFileChange={setResume}
                    disabled={loading}
                  />
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">2. Job Posting URL</h3>
                  <JobInput
                    value={jobUrl}
                    onChange={setJobUrl}
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleAnalyze}
                  disabled={loading || !resume || !jobUrl}
                  className="w-full py-3 text-lg font-bold shadow-md hover:shadow-lg transform transition-all active:scale-95"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      ✨ Analyze Match
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Pro Tip - Moved to Sidebar */}
            {result && result.pro_tip && (
              <ProTip tip={result.pro_tip} />
            )}
          </div>

          {/* Main Content - Results */}
          <div className="lg:col-span-8">
            {result ? (
              <AnalysisResult result={result} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 min-h-[400px]">
                <div className="w-24 h-24 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">Ready to Analyze</h3>
                <p className="max-w-md mx-auto">
                  Upload your resume and paste a LinkedIn job URL to get a comprehensive match analysis, strengths assessment, and tailored advice.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
