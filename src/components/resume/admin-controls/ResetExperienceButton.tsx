
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useAdminControls } from '../AdminControlsContext';

export const ResetExperienceButton = () => {
  const { 
    isResettingExperience, 
    onResetExperience, 
    isLoading, 
    isFixing, 
    isInitializing 
  } = useAdminControls();
  
  const isAnyOperationInProgress = isFixing || isLoading || isInitializing || isResettingExperience;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onResetExperience}
      disabled={isAnyOperationInProgress}
      className="flex items-center gap-1 text-purple-600 border-purple-300 hover:bg-purple-50"
    >
      {isResettingExperience ? (
        <>
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Resetting Experience...</span>
        </>
      ) : (
        <>
          <RefreshCw className="w-4 h-4" />
          <span>Reset Experience Data</span>
        </>
      )}
    </Button>
  );
};
