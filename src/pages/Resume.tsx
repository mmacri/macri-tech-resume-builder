
import React, { useState, useEffect } from 'react';
import ResumeContent from '@/components/resume/ResumeContent';
import ResumeErrorState from '@/components/resume/ResumeErrorState';
import ResumeLoadingState from '@/components/resume/ResumeLoadingState';
import ResumeDataLoader from '@/components/resume/ResumeDataLoader';
import { Button } from '@/components/ui/button';
import { Database, CircleAlert } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { fixDatabaseIssues } from '@/utils/resume/fixDatabaseIssues';

/**
 * Resume page component serving as the entry point for the resume view
 */
const Resume = () => {
  const [resumeSections, setResumeSections] = useState<any[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFixing, setIsFixing] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { isAdmin } = useAuth();

  // Callback handlers for the data loader
  const handleDataLoaded = (sections: any[]) => {
    setResumeSections(sections);
    setIsLoading(false);
    setError(null);
  };

  const handleDataError = (err: Error) => {
    setError(err);
    setIsLoading(false);
  };

  // Handler to retry data loading
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    // The ResumeDataLoader will automatically refetch when it remounts
  };

  // Handler to fix database issues
  const handleFixDatabaseIssues = async () => {
    if (!isAdmin) return;
    
    setIsFixing(true);
    toast.info('Diagnosing database issues...');
    
    try {
      const success = await fixDatabaseIssues();
      if (success) {
        toast.success('Database issues fixed successfully');
        handleRetry();
      } else {
        toast.error('Failed to fix all database issues');
      }
    } catch (error) {
      console.error('Error fixing database issues:', error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <>
      {/* Admin tools */}
      {isAdmin && (
        <div className="container mx-auto mt-4 mb-2">
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFixDatabaseIssues}
              disabled={isFixing || isLoading}
              className="flex items-center gap-1 text-amber-600 border-amber-300 hover:bg-amber-50"
            >
              {isFixing ? (
                <>
                  <CircleAlert className="w-4 h-4 animate-pulse" />
                  <span>Fixing...</span>
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  <span>Fix Database Issues</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Non-visual component to load and manage resume data */}
      {isLoading || !error ? (
        <ResumeDataLoader 
          onDataLoaded={handleDataLoaded} 
          onDataError={handleDataError} 
        />
      ) : null}
      
      {/* Conditional rendering based on loading/error state */}
      {isLoading ? (
        <ResumeLoadingState />
      ) : error ? (
        <ResumeErrorState onRetry={handleRetry} />
      ) : (
        <ResumeContent resumeSections={resumeSections || []} />
      )}
    </>
  );
};

export default Resume;
