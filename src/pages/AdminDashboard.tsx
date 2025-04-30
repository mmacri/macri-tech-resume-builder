import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminSectionStatus from '@/components/admin/AdminSectionStatus';
import { toast } from 'sonner';
import CardGrid from '@/components/admin/dashboard/CardGrid';
import { Button } from '@/components/ui/button';
import { useInitializeResumeData } from '@/hooks/resume/useInitializeResumeData';
import { supabase } from '@/integrations/supabase/client';
import LoadingStatus from '@/components/admin/status/LoadingStatus';
import CompletedStatus from '@/components/admin/status/CompletedStatus';
import { checkResumeSections, checkExperienceItems } from '@/utils/resume/checkResumeData';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [allSectionsReady, setAllSectionsReady] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);
  const [diagInfo, setDiagInfo] = useState<any>(null);
  const { initializeData, isInitializing, error } = useInitializeResumeData();
  const navigate = useNavigate();
  
  // Check if content exists in the database
  useEffect(() => {
    const checkContent = async () => {
      try {
        setIsChecking(true);
        setLastError(null);
        
        // First check the database connection directly
        const { data: sections, error: connError } = await supabase
          .from('resume_sections')
          .select('*');
          
        if (connError) {
          console.error('Database connection test failed:', connError);
          setLastError(`Database connection issue: ${connError.message}`);
          setDiagInfo({ connError });
          return;
        }
        
        // Use our diagnostic function to check resume sections
        const sectionsResult = await checkResumeSections();
        console.log('Resume sections check result:', sectionsResult);
        
        // Store diagnostic info
        setDiagInfo({
          sectionsResult,
          timestamp: new Date().toISOString()
        });
        
        if (sectionsResult.success && sectionsResult.sections.length > 0) {
          // Check experience items
          const experienceResult = await checkExperienceItems();
          console.log('Experience items check result:', experienceResult);
          setDiagInfo(prev => ({
            ...prev,
            experienceResult
          }));
        } else if (!sectionsResult.success) {
          setLastError(`Resume sections check failed: ${sectionsResult.error}`);
          return;
        }
        
        // Check resume sections count
        const sectionCount = sections?.length || 0;
        
        // Check portfolio projects
        const { data: projects, error: projectError } = await supabase
          .from('portfolio_projects')
          .select('*');
          
        if (projectError) {
          setLastError(`Error checking projects: ${projectError.message}`);
          throw projectError;
        }

        const projectCount = projects?.length || 0;
        
        // Check blog posts
        const { data: blogPosts, error: blogError } = await supabase
          .from('blog_posts')
          .select('*');
          
        if (blogError) {
          setLastError(`Error checking blog posts: ${blogError.message}`);
          throw blogError;
        }
        
        const blogCount = blogPosts?.length || 0;
        
        // Set status based on whether content exists
        setAllSectionsReady(
          sectionCount > 0 && 
          projectCount > 0 &&
          blogCount > 0
        );
        
        setDiagInfo(prev => ({
          ...prev,
          sectionCount,
          projectCount,
          blogCount
        }));
        
        console.log('Content check completed:', {
          sectionCount,
          projectCount,
          blogCount,
          allSectionsReady: sectionCount > 0 && projectCount > 0 && blogCount > 0
        });
      } catch (error) {
        console.error('Error checking content:', error);
        toast.error('Failed to check content status');
        setLastError(error instanceof Error ? error.message : 'Unknown error checking content');
      } finally {
        setIsChecking(false);
      }
    };
    
    checkContent();
  }, [isInitializing]);
  
  // Clear the error when initialization status changes
  useEffect(() => {
    if (!isInitializing) {
      // Check if there was an error
      if (error) {
        setLastError(error instanceof Error ? error.message : 'Unknown initialization error');
      }
    }
  }, [isInitializing, error]);
  
  const handleAllSectionsPopulated = () => {
    setAllSectionsReady(true);
    toast.success('All content sections are now populated with data!');
  };

  const handleInitializeData = () => {
    console.log('Initializing data with default options');
    setLastError(null);
    toast.info('Starting resume data initialization...');
    initializeData({});
  };

  const handleForceInitializeData = () => {
    if (window.confirm('This will reset all resume data with fresh sample data. Are you sure?')) {
      console.log('Initializing data with force option');
      setLastError(null);
      toast.info('Starting forced resume data initialization...');
      initializeData({ force: true });
    }
  };

  const navigateToResumePage = () => {
    navigate('/admin#resume');
  };

  const checkDatabaseStatus = async () => {
    try {
      setIsChecking(true);
      setLastError(null);
      toast.info('Checking database status...');
      
      // First check DB connection
      const { data: sections, error: connError } = await supabase
        .from('resume_sections')
        .select('*');
        
      if (connError) {
        console.error('Database connection test failed:', connError);
        toast.error(`Database connection issue: ${connError.message}`);
        setLastError(`Database connection issue: ${connError.message}`);
        return;
      }
      
      toast.success('Database connection successful.');
      
      const sectionsResult = await checkResumeSections();
      console.log('Sections check result:', sectionsResult);
      
      if (sectionsResult.success) {
        if (sectionsResult.sections.length === 0) {
          toast.warning('No resume sections found. Please initialize data.');
        } else {
          toast.success(`Found ${sectionsResult.sections.length} resume sections.`);
          
          // Check for items
          if (sectionsResult.hasItems) {
            toast.success('Resume sections have content items.');
          } else {
            toast.warning('Resume sections exist but have no content items.');
          }
          
          // Check experience specifically
          const experienceResult = await checkExperienceItems();
          if (experienceResult.success && experienceResult.items.length > 0) {
            toast.success(`Found ${experienceResult.items.length} experience items.`);
          } else {
            toast.warning('No experience items found.');
          }
        }
      } else {
        toast.error('Failed to check resume sections.');
        setLastError(sectionsResult.error ? 
          (sectionsResult.error instanceof Error ? sectionsResult.error.message : 'Unknown error') : 
          'Unknown error checking resume sections');
      }
    } catch (error) {
      console.error('Error checking database status:', error);
      toast.error('Failed to check database status');
      setLastError(error instanceof Error ? error.message : 'Unknown error checking database status');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {lastError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{lastError}</AlertDescription>
          </Alert>
        )}
        
        <div className="mb-6">
          {isChecking ? (
            <LoadingStatus />
          ) : allSectionsReady ? (
            <CompletedStatus />
          ) : (
            <AdminSectionStatus onAllSectionsPopulated={handleAllSectionsPopulated} />
          )}
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Button 
              onClick={handleInitializeData} 
              disabled={isInitializing} 
              variant="default"
            >
              {isInitializing ? 'Initializing...' : 'Initialize Resume Data'}
            </Button>
            <Button 
              onClick={handleForceInitializeData}
              disabled={isInitializing}
              variant="destructive"
            >
              Reset Resume Data
            </Button>
            <Button 
              onClick={navigateToResumePage}
              variant="outline"
            >
              Manage Resume
            </Button>
            <Button 
              onClick={checkDatabaseStatus}
              variant="secondary"
              disabled={isChecking}
            >
              Check Database Status
            </Button>
          </div>
        </div>
        
        <CardGrid />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
