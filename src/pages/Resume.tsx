
import React, { useEffect } from 'react';
import AdminControls from '@/components/resume/AdminControls';
import ResumeContainer from '@/components/resume/ResumeContainer';
import { useResumeHandlers } from '@/hooks/resume/useResumeHandlers';
import { setupLazyLoading, prepareLazyImages } from '@/utils/lazyLoadUtils';
import { useNavigationItems } from '@/components/routing/NavigationConfig';
import MobileNavMenu from '@/components/layout/MobileNavMenu';

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

  const { getResumeNavItems } = useNavigationItems();
  const navItems = getResumeNavItems();
  
  // Filter out items for the mobile menu (only sections)
  const mobileNavItems = navItems.filter(item => item.href?.startsWith('#'));

  useEffect(() => {
    // Prepare images for lazy loading
    prepareLazyImages();
    
    // Set up lazy loading for images
    const lazyLoadCleanup = setupLazyLoading();
    
    // Clean up when component unmounts
    return () => {
      lazyLoadCleanup();
    };
  }, []);

  return (
    <>
      <div className="fixed top-4 right-4 z-40">
        <MobileNavMenu navItems={mobileNavItems} />
      </div>
      
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
