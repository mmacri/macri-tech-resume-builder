
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useResumeDataState = () => {
  const [resumeSections, setResumeSections] = useState<any[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
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
    error,
    handleDataLoaded,
    handleDataError,
    handleRetry
  };
};
