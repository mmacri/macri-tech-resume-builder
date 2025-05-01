
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useAdminControls } from '../AdminControlsContext';

export const InitializeDataButton = () => {
  const { 
    isInitializing, 
    onInitializeData, 
    isLoading, 
    isFixing, 
    isResettingExperience 
  } = useAdminControls();
  
  const isAnyOperationInProgress = isFixing || isLoading || isInitializing || isResettingExperience;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onInitializeData}
      disabled={isAnyOperationInProgress}
      className="flex items-center gap-1 text-green-600 border-green-300 hover:bg-green-50"
    >
      {isInitializing ? (
        <>
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Initializing...</span>
        </>
      ) : (
        <>
          <RefreshCw className="w-4 h-4" />
          <span>Initialize Resume Data</span>
        </>
      )}
    </Button>
  );
};
