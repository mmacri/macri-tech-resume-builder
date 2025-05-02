
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { initializeResumeData } from '@/utils/resume/initializeResumeData';

/**
 * Hook to handle auto-initialization of resume data
 */
export const useHomeAutoInit = (isAdmin: boolean) => {
  // Attempt to auto-initialize data on component mount
  const attemptAutoInit = async () => {
    if (isAdmin) {
      try {
        console.log('Attempting to auto-initialize resume data...');
        const initResult = await initializeResumeData({});
        if (initResult.success) {
          console.log('Auto-initialized resume data successfully');
        }
      } catch (initError) {
        console.error('Error auto-initializing data:', initError);
      }
    }
  };

  return { attemptAutoInit };
};
