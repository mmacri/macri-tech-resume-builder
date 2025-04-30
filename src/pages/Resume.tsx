
import React, { useState } from 'react';
import ResumeContent from '@/components/resume/ResumeContent';
import ResumeErrorState from '@/components/resume/ResumeErrorState';
import ResumeLoadingState from '@/components/resume/ResumeLoadingState';
import ResumeDataLoader from '@/components/resume/ResumeDataLoader';

/**
 * Resume page component serving as the entry point for the resume view
 */
const Resume = () => {
  const [resumeSections, setResumeSections] = useState<any[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Callback handlers for the data loader
  const handleDataLoaded = (sections: any[]) => {
    setResumeSections(sections);
    setIsLoading(false);
    setError(null);
  };

  const handleDataError = (err: Error) => {
    setError(err);
    setIsLoading(false);
  };

  // Handler to retry data loading
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    // The ResumeDataLoader will automatically refetch when it remounts
  };

  return (
    <>
      {/* Non-visual component to load and manage resume data */}
      {isLoading || !error ? (
        <ResumeDataLoader 
          onDataLoaded={handleDataLoaded} 
          onDataError={handleDataError} 
        />
      ) : null}
      
      {/* Conditional rendering based on loading/error state */}
      {isLoading ? (
        <ResumeLoadingState />
      ) : error ? (
        <ResumeErrorState onRetry={handleRetry} />
      ) : (
        <ResumeContent resumeSections={resumeSections || []} />
      )}
    </>
  );
};

export default Resume;
