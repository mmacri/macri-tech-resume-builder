
import React from 'react';
import { Button } from '@/components/ui/button';
import { CircleAlert, RefreshCw, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AdminControlsProps {
  isAdmin: boolean;
  resumeSections: any[] | undefined;
  isLoading: boolean;
  isFixing: boolean;
  isInitializing: boolean;
  isResettingExperience: boolean;
  onResetExperience: () => void;
  onInitializeData: () => void;
  onFixDatabaseIssues: () => void;
}

/**
 * Admin controls component for the Resume page
 * Provides functionality for initializing and fixing resume data
 */
const AdminControls: React.FC<AdminControlsProps> = ({
  isAdmin,
  resumeSections,
  isLoading,
  isFixing,
  isInitializing,
  isResettingExperience,
  onResetExperience,
  onInitializeData,
  onFixDatabaseIssues
}) => {
  if (!isAdmin) return null;

  const hasNoData = !resumeSections || resumeSections.length === 0;
  const isAnyOperationInProgress = isFixing || isLoading || isInitializing || isResettingExperience;

  return (
    <div className="container mx-auto mt-4 mb-2">
      <div className="space-y-4">
        {hasNoData && !isLoading && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Resume Data Missing</AlertTitle>
            <AlertDescription>
              No resume data was found in the database. Use the buttons below to initialize or fix data.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-wrap gap-2 justify-end">
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
        </div>
      </div>
    </div>
  );
};

export default AdminControls;
