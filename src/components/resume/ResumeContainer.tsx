
import React from 'react';
import ResumeContent from '@/components/resume/ResumeContent';
import ResumeErrorState from '@/components/resume/ResumeErrorState';
import ResumeLoadingState from '@/components/resume/ResumeLoadingState';
import ResumeDataLoader from '@/components/resume/ResumeDataLoader';

interface ResumeContainerProps {
  isLoading: boolean;
  error: Error | null;
  resumeSections: any[] | undefined;
  onDataLoaded: (sections: any[]) => void;
  onDataError: (error: Error) => void;
  onRetry: () => void;
  onInitializeData: () => void;
}

/**
 * Container component for Resume page content
 * Handles conditional rendering based on loading/error states
 */
const ResumeContainer: React.FC<ResumeContainerProps> = ({
  isLoading,
  error,
  resumeSections,
  onDataLoaded,
  onDataError,
  onRetry,
  onInitializeData
}) => {
  return (
    <>
      {/* Non-visual component to load and manage resume data */}
      {isLoading || !error ? (
        <ResumeDataLoader 
          onDataLoaded={onDataLoaded} 
          onDataError={onDataError} 
        />
      ) : null}
      
      {/* Conditional rendering based on loading/error state */}
      {isLoading ? (
        <ResumeLoadingState />
      ) : error ? (
        <ResumeErrorState onRetry={onRetry} onInitializeData={onInitializeData} />
      ) : (
        <ResumeContent resumeSections={resumeSections || []} />
      )}
    </>
  );
};

export default ResumeContainer;
