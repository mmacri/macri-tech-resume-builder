
import React from 'react';
import AdminControls from '@/components/resume/AdminControls';
import ResumeContainer from '@/components/resume/ResumeContainer';
import { useResumeHandlers } from '@/hooks/resume/useResumeHandlers';

/**
 * Resume page component serving as the entry point for the resume view
 */
const Resume = () => {
  const {
    resumeSections,
    isLoading,
    isFixing,
    isResettingExperience,
    error,
    isInitializing,
    isAdmin,
    handleDataLoaded,
    handleDataError,
    handleRetry,
    handleInitializeData,
    handleFixDatabaseIssues,
    handleResetExperience
  } = useResumeHandlers();

  return (
    <>
      {/* Admin tools */}
      <AdminControls 
        isAdmin={isAdmin}
        resumeSections={resumeSections}
        isLoading={isLoading}
        isFixing={isFixing}
        isInitializing={isInitializing}
        isResettingExperience={isResettingExperience}
        onResetExperience={handleResetExperience}
        onInitializeData={handleInitializeData}
        onFixDatabaseIssues={handleFixDatabaseIssues}
      />
      
      {/* Resume content with appropriate loading/error states */}
      <ResumeContainer
        isLoading={isLoading}
        error={error}
        resumeSections={resumeSections}
        onDataLoaded={handleDataLoaded}
        onDataError={handleDataError}
        onRetry={handleRetry}
        onInitializeData={handleInitializeData}
      />
    </>
  );
};

export default Resume;
