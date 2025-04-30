
import React, { useState } from 'react';
import HomeContent from '@/components/home/HomeContent';
import HomeErrorState from '@/components/home/HomeErrorState';
import HomeLoadingState from '@/components/home/HomeLoadingState';
import ResumeDataLoader from '@/components/home/ResumeDataLoader';

/**
 * Home page component serving as the main entry point for the resume website
 */
const Home = () => {
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
        <HomeLoadingState />
      ) : error ? (
        <HomeErrorState onRetry={handleRetry} />
      ) : (
        <HomeContent resumeSections={resumeSections} />
      )}
    </>
  );
};

export default Home;
