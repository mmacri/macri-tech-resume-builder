
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { initializeResumeData } from '@/utils/resume/initializeResumeData';
import { fixDatabaseIssues } from '@/utils/resume/fixDatabaseIssues';
import { forceInitExperience } from '@/utils/resume/forceInitExperience';

export const useResumeHandlers = () => {
  const [resumeSections, setResumeSections] = useState<any[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFixing, setIsFixing] = useState<boolean>(false);
  const [isResettingExperience, setIsResettingExperience] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const { isAdmin } = useAuth();

  // Callback handlers for the data loader
  const handleDataLoaded = (sections: any[]) => {
    console.log(`Resume sections loaded: ${sections.length}`);
    setResumeSections(sections);
    setIsLoading(false);
    setError(null);
  };

  const handleDataError = (err: Error) => {
    console.error('Resume data error:', err);
    setError(err);
    setIsLoading(false);
  };

  // Handler to retry data loading
  const handleRetry = () => {
    console.log('Retrying data load...');
    setIsLoading(true);
    setError(null);
    // The ResumeDataLoader will automatically refetch when it remounts
  };

  // Handler to initialize resume data
  const handleInitializeData = async () => {
    if (!isAdmin) {
      toast.error('Only administrators can initialize resume data');
      return;
    }
    
    setIsInitializing(true);
    toast.info('Initializing resume data...');
    
    try {
      const result = await initializeResumeData({ force: true });
      if (result.success) {
        toast.success('Resume data initialized successfully');
        handleRetry();
      } else {
        toast.error(`Failed to initialize resume data: ${result.message}`);
      }
    } catch (error) {
      console.error('Error initializing data:', error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsInitializing(false);
    }
  };

  // Handler to fix database issues
  const handleFixDatabaseIssues = async () => {
    if (!isAdmin) return;
    
    setIsFixing(true);
    toast.info('Diagnosing and fixing database issues...');
    
    try {
      const success = await fixDatabaseIssues();
      if (success) {
        toast.success('Database issues fixed successfully');
        handleRetry();
      } else {
        toast.error('Failed to fix all database issues');
      }
    } catch (error) {
      console.error('Error fixing database issues:', error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsFixing(false);
    }
  };

  // Handler to reset experience data
  const handleResetExperience = async () => {
    if (!isAdmin) return;
    
    setIsResettingExperience(true);
    toast.info('Resetting experience data...');
    
    try {
      const result = await forceInitExperience();
      if (result.initialized) {
        toast.success('Experience data reset and initialized successfully');
        handleRetry();
      } else {
        toast.error(`Failed to reset experience data: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error resetting experience data:', error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsResettingExperience(false);
    }
  };

  // Check on initial render if any data is available
  useEffect(() => {
    if (!isLoading && (!resumeSections || resumeSections.length === 0)) {
      console.log('No resume sections found after initial load');
      
      // Show a helpful message for admins
      if (isAdmin) {
        toast.warning('No resume data found. Please initialize or fix the database.');
      }
    }
  }, [isLoading, resumeSections, isAdmin]);

  return {
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
  };
};
