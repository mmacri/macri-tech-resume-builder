
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { initializeResumeData } from '@/utils/resume/initializeResumeData';
import { toast } from 'sonner';

/**
 * Hook to handle auto-initialization of resume data
 */
export const useResumeAutoInit = () => {
  const { isAdmin } = useAuth();
  const [autoInitAttempted, setAutoInitAttempted] = useState(false);
  
  const attemptAutoInit = async (force = false) => {
    if (isAdmin && !autoInitAttempted) {
      setAutoInitAttempted(true);
      
      console.log('Attempting auto-initialization...');
      
      // Auto-initialize after a short delay to prevent race conditions
      try {
        const result = await initializeResumeData({ force });
        if (result.success) {
          console.log('Auto-initialization successful');
          toast.success('Resume data initialized automatically');
          return true;
        } else {
          console.error('Auto-initialization failed:', result.message);
          if (force) {
            toast.error('Failed to initialize resume data automatically');
          }
          return false;
        }
      } catch (err) {
        console.error('Error during auto-initialization:', err);
        if (force) {
          toast.error('Error initializing resume data');
        }
        return false;
      }
    }
    return false;
  };

  return {
    autoInitAttempted,
    attemptAutoInit
  };
};
