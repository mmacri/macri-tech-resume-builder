
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { initializeResumeData } from '@/utils/resume/initializeResumeData';

/**
 * Hook to handle auto-initialization of resume data for Home page
 */
export const useHomeAutoInit = (isAdmin: boolean) => {
  const [autoInitAttempted, setAutoInitAttempted] = useState(false);
  
  // Auto-initialize on component mount
  useEffect(() => {
    if (isAdmin && !autoInitAttempted) {
      setAutoInitAttempted(true);
      
      const attemptInit = async () => {
        try {
          console.log('Attempting to auto-initialize resume data...');
          const initResult = await initializeResumeData({});
          if (initResult.success) {
            console.log('Auto-initialized resume data successfully');
          }
        } catch (error) {
          console.error('Error auto-initializing data:', error);
        }
      };
      
      attemptInit();
    }
  }, [isAdmin, autoInitAttempted]);

  const attemptManualInit = async () => {
    if (isAdmin) {
      try {
        console.log('Attempting to manually initialize resume data...');
        const initResult = await initializeResumeData({ force: true });
        if (initResult.success) {
          console.log('Resume data initialized successfully');
          toast.success('Resume data initialized successfully');
          return true;
        } else {
          console.error('Failed to initialize resume data:', initResult.message);
          toast.error('Failed to initialize resume data');
          return false;
        }
      } catch (error) {
        console.error('Error initializing data:', error);
        toast.error('Error initializing resume data');
        return false;
      }
    }
    return false;
  };

  return { 
    autoInitAttempted,
    attemptManualInit
  };
};
