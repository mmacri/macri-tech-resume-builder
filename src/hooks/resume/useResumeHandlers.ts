
import { useAuth } from '@/contexts/AuthContext';
import { useResumeDataState } from './useResumeDataState';
import { useResumeInitialization } from './useResumeInitialization';

/**
 * Main hook for Resume page functionality
 * Combines data state and initialization hooks
 */
export const useResumeHandlers = () => {
  const { isAdmin } = useAuth();
  
  // Separate hooks for different concerns
  const {
    resumeSections,
    isLoading,
    error,
    handleDataLoaded,
    handleDataError,
    handleRetry
  } = useResumeDataState();
  
  const {
    isInitializing,
    isFixing,
    isResettingExperience,
    handleInitializeData,
    handleFixDatabaseIssues,
    handleResetExperience
  } = useResumeInitialization();

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
