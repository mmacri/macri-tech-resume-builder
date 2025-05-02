
import React from 'react';
import { useHomeResumeData } from '@/hooks/resume/useHomeResumeData';
import { useHomeResumeInit } from '@/hooks/resume/useHomeResumeInit';
import { useHomeResumeProcessing } from '@/hooks/resume/useHomeResumeProcessing';
import { useHomeAutoInit } from '@/hooks/resume/useHomeAutoInit';
import { useAuth } from '@/contexts/AuthContext';

interface ResumeDataLoaderProps {
  onDataLoaded: (sections: any[]) => void;
  onDataError: (error: Error) => void;
}

/**
 * Component responsible for loading resume data and initializing if needed
 */
const ResumeDataLoader: React.FC<ResumeDataLoaderProps> = ({ onDataLoaded, onDataError }) => {
  const { isAdmin } = useAuth();
  
  // Use our smaller, focused hooks
  const { data: resumeSections, isLoading, error, refetch } = useHomeResumeData();
  
  // Handle auto-initialization
  const { attemptAutoInit } = useHomeAutoInit(isAdmin);
  
  // Initialize on component mount
  React.useEffect(() => {
    attemptAutoInit();
  }, []);
  
  // Handle data initialization for admin users
  useHomeResumeInit(resumeSections, isLoading, refetch);
  
  // Process and prepare data for components
  useHomeResumeProcessing(resumeSections, isLoading, error as Error, onDataLoaded, onDataError);

  return null; // This is a non-visual component
};

export default ResumeDataLoader;
