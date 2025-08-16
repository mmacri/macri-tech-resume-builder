import { useState, useEffect } from 'react';
import { staticExperienceData } from '@/data/staticResumeData';

export function useSimpleResumeData() {
  const [resumeSections, setResumeSections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Use static data directly
    setResumeSections([]);
    setIsLoading(false);
    setError(null);
  }, []);

  const handleDataLoaded = (sections: any[]) => {
    setResumeSections(sections);
  };

  const handleDataError = (err: Error) => {
    setError(err);
  };

  const handleRetry = () => {
    setResumeSections([]);
    setError(null);
  };

  return {
    resumeSections,
    isLoading,
    error,
    handleDataLoaded,
    handleDataError,
    handleRetry
  };
}