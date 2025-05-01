
import React from 'react';
import { Button } from '@/components/ui/button';
import { CircleAlert } from 'lucide-react';
import { useAdminControls } from '../AdminControlsContext';

export const FixDatabaseButton = () => {
  const { 
    isFixing, 
    onFixDatabaseIssues, 
    isLoading, 
    isInitializing, 
    isResettingExperience 
  } = useAdminControls();
  
  const isAnyOperationInProgress = isFixing || isLoading || isInitializing || isResettingExperience;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onFixDatabaseIssues}
      disabled={isAnyOperationInProgress}
      className="flex items-center gap-1 text-amber-600 border-amber-300 hover:bg-amber-50"
    >
      {isFixing ? (
        <>
          <CircleAlert className="w-4 h-4 animate-pulse" />
          <span>Fixing...</span>
        </>
      ) : (
        <>
          <CircleAlert className="w-4 h-4" />
          <span>Fix Database Issues</span>
        </>
      )}
    </Button>
  );
};
