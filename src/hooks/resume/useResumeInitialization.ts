
import { useState } from 'react';
import { toast } from 'sonner';
import { initializeResumeData } from '@/utils/resume/initializeResumeData';
import { fixDatabaseIssues } from '@/utils/resume/fixDatabaseIssues';
import { forceInitExperience } from '@/utils/resume/forceInitExperience';

export const useResumeInitialization = () => {
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [isFixing, setIsFixing] = useState<boolean>(false);
  const [isResettingExperience, setIsResettingExperience] = useState<boolean>(false);

  // Handler to initialize resume data
  const handleInitializeData = async () => {
    setIsInitializing(true);
    toast.info('Initializing resume data...');
    
    try {
      const result = await initializeResumeData({ force: true });
      if (result.success) {
        toast.success('Resume data initialized successfully');
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
    setIsFixing(true);
    toast.info('Diagnosing and fixing database issues...');
    
    try {
      const success = await fixDatabaseIssues();
      if (success) {
        toast.success('Database issues fixed successfully');
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
    setIsResettingExperience(true);
    toast.info('Resetting experience data...');
    
    try {
      const result = await forceInitExperience();
      if (result.initialized) {
        toast.success('Experience data reset and initialized successfully');
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

  return {
    isInitializing,
    isFixing,
    isResettingExperience,
    handleInitializeData,
    handleFixDatabaseIssues,
    handleResetExperience
  };
};
