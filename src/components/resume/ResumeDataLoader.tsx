
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useResumeData } from '@/hooks/resume/useResumeData';
import { useResumeAutoInit } from '@/hooks/resume/useResumeAutoInit';
import { useExperienceInit } from '@/hooks/resume/useExperienceInit';
import { useResumeProcessing } from '@/hooks/resume/useResumeProcessing';

interface ResumeDataLoaderProps {
  onDataLoaded: (sections: any[]) => void;
  onDataError: (error: Error) => void;
}

/**
 * Component responsible for loading resume data for the Resume page
 */
const ResumeDataLoader: React.FC<ResumeDataLoaderProps> = ({ onDataLoaded, onDataError }) => {
  const { isAdmin } = useAuth();
  
  // Use our hooks for data loading and processing
  const { data: resumeSections, isLoading, error, refetch } = useResumeData();
  const { autoInitAttempted, attemptAutoInit } = useResumeAutoInit();
  
  // Initialize experience data if needed
  useExperienceInit(resumeSections, isAdmin, refetch);
  
  // Process loaded data and handle fallbacks
  useResumeProcessing(isLoading, error as Error, resumeSections, onDataLoaded, onDataError);
  
  // Auto-initialize data if no sections found
  React.useEffect(() => {
    if (isAdmin && 
        !isLoading && 
        (!resumeSections || resumeSections.length === 0) && 
        !autoInitAttempted) {
      
      // Auto-initialize with a delay
      const timer = setTimeout(() => {
        attemptAutoInit(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, resumeSections, isAdmin, autoInitAttempted, attemptAutoInit]);

  return null; // This is a non-visual component
};

export default ResumeDataLoader;
