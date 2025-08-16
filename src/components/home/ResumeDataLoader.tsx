
import React from 'react';
import { useHomeResumeData } from '@/hooks/resume/useHomeResumeData';
import { useHomeResumeProcessing } from '@/hooks/resume/useHomeResumeProcessing';
import { useHomeAutoInit } from '@/hooks/resume/useHomeAutoInit';
import { useHomeExperienceInit } from '@/hooks/resume/useHomeExperienceInit';
import { useAuth } from '@/contexts/AuthContext';

interface ResumeDataLoaderProps {
  onDataLoaded: (sections: any[]) => void;
  onDataError: (error: Error) => void;
}

/**
 * Component responsible for loading resume data for the Home page
 */
const ResumeDataLoader: React.FC<ResumeDataLoaderProps> = ({ onDataLoaded, onDataError }) => {
  const { isAdmin } = useAuth();
  
  // Use our smaller, focused hooks
  const { data: resumeSections, isLoading, error, refetch } = useHomeResumeData();
  const { attemptManualInit } = useHomeAutoInit(isAdmin);
  
  // Initialize experience data if needed
  useHomeExperienceInit(resumeSections, isAdmin, refetch);
  
  // Process and prepare data for components
  useHomeResumeProcessing(resumeSections, isLoading, error as Error, onDataLoaded, onDataError);

  // Auto-initialize on component mount if needed - with debouncing to prevent repeated calls
  React.useEffect(() => {
    if (isAdmin && !isLoading && (!resumeSections || resumeSections.length === 0)) {
      console.log('No resume sections found on initial load, attempting to initialize...');
      const timeoutId = setTimeout(() => {
        attemptManualInit().then(success => {
          if (success) {
            setTimeout(() => refetch(), 1000); // Refetch after a short delay
          }
        });
      }, 500); // Debounce the initialization

      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, resumeSections?.length, isAdmin]); // Use length instead of the full array to prevent unnecessary re-runs

  return null; // This is a non-visual component
};

export default ResumeDataLoader;
