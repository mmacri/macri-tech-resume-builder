
import React, { useState, useEffect } from 'react';
import ResumeContent from '@/components/resume/ResumeContent';
import ResumeErrorState from '@/components/resume/ResumeErrorState';
import ResumeLoadingState from '@/components/resume/ResumeLoadingState';
import ResumeDataLoader from '@/components/resume/ResumeDataLoader';
import { Button } from '@/components/ui/button';
import { Database, CircleAlert, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { fixDatabaseIssues } from '@/utils/resume/fixDatabaseIssues';
import { initializeResumeData } from '@/utils/resume/initializeResumeData';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * Resume page component serving as the entry point for the resume view
 */
const Resume = () => {
  const [resumeSections, setResumeSections] = useState<any[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFixing, setIsFixing] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const { isAdmin } = useAuth();

  // Callback handlers for the data loader
  const handleDataLoaded = (sections: any[]) => {
    console.log(`Resume sections loaded: ${sections.length}`);
    setResumeSections(sections);
    setIsLoading(false);
    setError(null);
  };

  const handleDataError = (err: Error) => {
    console.error('Resume data error:', err);
    setError(err);
    setIsLoading(false);
  };

  // Handler to retry data loading
  const handleRetry = () => {
    console.log('Retrying data load...');
    setIsLoading(true);
    setError(null);
    // The ResumeDataLoader will automatically refetch when it remounts
  };

  // Handler to initialize resume data
  const handleInitializeData = async () => {
    if (!isAdmin) {
      toast.error('Only administrators can initialize resume data');
      return;
    }
    
    setIsInitializing(true);
    toast.info('Initializing resume data...');
    
    try {
      const result = await initializeResumeData({ force: true });
      if (result.success) {
        toast.success('Resume data initialized successfully');
        handleRetry();
      } else {
        toast.error(`Failed to initialize resume data: ${result.message}`);
      }
    } catch (error) {
      console.error('Error initializing data:', error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsInitializing(false);
    }
  };

  // Handler to fix database issues
  const handleFixDatabaseIssues = async () => {
    if (!isAdmin) return;
    
    setIsFixing(true);
    toast.info('Diagnosing and fixing database issues...');
    
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

  // Check on initial render if any data is available
  useEffect(() => {
    if (!isLoading && (!resumeSections || resumeSections.length === 0)) {
      console.log('No resume sections found after initial load');
      
      // Show a helpful message for admins
      if (isAdmin) {
        toast.warning('No resume data found. Please initialize or fix the database.');
      }
    }
  }, [isLoading, resumeSections, isAdmin]);

  return (
    <>
      {/* Admin tools */}
      {isAdmin && (
        <div className="container mx-auto mt-4 mb-2">
          <div className="space-y-4">
            {(!resumeSections || resumeSections.length === 0) && !isLoading && (
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
                onClick={handleInitializeData}
                disabled={isInitializing || isFixing || isLoading}
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
                onClick={handleFixDatabaseIssues}
                disabled={isFixing || isLoading || isInitializing}
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
        <ResumeErrorState onRetry={handleRetry} onInitializeData={handleInitializeData} />
      ) : (
        <ResumeContent resumeSections={resumeSections || []} />
      )}
    </>
  );
};

export default Resume;
