
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
import { AlertCircle, CheckCircle, Database, User } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  console.log('AdminDashboard: Current user:', user?.email, 'isAdmin:', isAdmin);
  const [allSectionsReady, setAllSectionsReady] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [dbStats, setDbStats] = useState({
    sections: 0,
    projects: 0,
    blogs: 0,
    profiles: 0
  });
  const { initializeData, isInitializing, error } = useInitializeResumeData();
  const navigate = useNavigate();
  
  // Test database connection first
  const testConnection = async () => {
    try {
      setConnectionStatus('checking');
      console.log('Testing database connection...');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('count', { count: 'exact', head: true });
        
      if (error) {
        console.error('Database connection failed:', error);
        setConnectionStatus('error');
        setLastError(`Database connection failed: ${error.message}`);
        return false;
      }
      
      console.log('Database connection successful');
      setConnectionStatus('connected');
      setLastError(null);
      return true;
    } catch (err) {
      console.error('Unexpected connection error:', err);
      setConnectionStatus('error');
      setLastError(`Connection error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return false;
    }
  };
  
  // Check if content exists in the database
  const checkContent = async () => {
    if (connectionStatus !== 'connected') {
      return;
    }
    
    try {
      setIsChecking(true);
      setLastError(null);
      console.log('Checking database content...');
      
      // Check all tables with proper error handling
      const [sectionsResult, projectsResult, blogsResult, profilesResult] = await Promise.allSettled([
        supabase.from('resume_sections').select('*', { count: 'exact', head: true }),
        supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true })
      ]);
      
      // Process results safely
      const sectionCount = sectionsResult.status === 'fulfilled' ? sectionsResult.value.count || 0 : 0;
      const projectCount = projectsResult.status === 'fulfilled' ? projectsResult.value.count || 0 : 0;
      const blogCount = blogsResult.status === 'fulfilled' ? blogsResult.value.count || 0 : 0;
      const profileCount = profilesResult.status === 'fulfilled' ? profilesResult.value.count || 0 : 0;
      
      // Log any failures
      if (sectionsResult.status === 'rejected') {
        console.warn('Failed to check resume_sections:', sectionsResult.reason);
      }
      if (projectsResult.status === 'rejected') {
        console.warn('Failed to check portfolio_projects:', projectsResult.reason);
      }
      if (blogsResult.status === 'rejected') {
        console.warn('Failed to check blog_posts:', blogsResult.reason);
      }
      if (profilesResult.status === 'rejected') {
        console.warn('Failed to check profiles:', profilesResult.reason);
      }
      
      // Update stats
      setDbStats({
        sections: sectionCount,
        projects: projectCount,
        blogs: blogCount,
        profiles: profileCount
      });
      
      // Set status based on whether content exists
      const hasContent = sectionCount > 0 && projectCount > 0 && blogCount > 0;
      setAllSectionsReady(hasContent);
      
      console.log('Content check completed:', {
        sections: sectionCount,
        projects: projectCount,
        blogs: blogCount,
        profiles: profileCount,
        allReady: hasContent
      });
      
      if (!hasContent) {
        console.log('Some content is missing - initialization may be needed');
      }
      
    } catch (error) {
      console.error('Error checking content:', error);
      setLastError(error instanceof Error ? error.message : 'Unknown error checking content');
    } finally {
      setIsChecking(false);
    }
  };

  // Initial connection test
  useEffect(() => {
    testConnection();
  }, []);
  
  // Check content when connection is established or when initialization completes
  useEffect(() => {
    if (connectionStatus === 'connected' && !isInitializing) {
      checkContent();
    }
  }, [connectionStatus, isInitializing]);
  
  // Handle initialization errors
  useEffect(() => {
    if (error && !isInitializing) {
      setLastError(error instanceof Error ? error.message : 'Unknown initialization error');
    }
  }, [error, isInitializing]);
  
  const handleAllSectionsPopulated = () => {
    setAllSectionsReady(true);
    toast.success('All content sections are now populated with data!');
  };

  const handleInitializeData = async () => {
    console.log('Initializing data with default options');
    setLastError(null);
    toast.info('Starting resume data initialization...');
    
    try {
      await initializeData({});
      toast.success('Data initialization completed');
    } catch (err) {
      console.error('Initialization failed:', err);
      setLastError(err instanceof Error ? err.message : 'Unknown initialization error');
    }
  };

  const handleForceInitializeData = async () => {
    if (window.confirm('This will reset all resume data with fresh sample data. Are you sure?')) {
      console.log('Initializing data with force option');
      setLastError(null);
      toast.info('Starting forced resume data initialization...');
      
      try {
        await initializeData({ force: true });
        toast.success('Forced data initialization completed');
      } catch (err) {
        console.error('Force initialization failed:', err);
        setLastError(err instanceof Error ? err.message : 'Unknown force initialization error');
      }
    }
  };

  const navigateToResumePage = () => {
    navigate('/admin#resume');
  };

  const handleCheckDatabaseStatus = async () => {
    await testConnection();
    if (connectionStatus === 'connected') {
      await checkContent();
    }
  };

  const handleRetryConnection = async () => {
    setLastError(null);
    await testConnection();
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Current User Info */}
        <div className="mb-4">
          <Alert>
            <User className="h-4 w-4" />
            <AlertTitle>Current User</AlertTitle>
            <AlertDescription>
              Logged in as: {user?.email} | Admin Status: {isAdmin ? 'Yes' : 'No'}
            </AlertDescription>
          </Alert>
        </div>
        
        {/* Connection Status */}
        <div className="mb-4">
          {connectionStatus === 'checking' && (
            <Alert>
              <Database className="h-4 w-4" />
              <AlertTitle>Checking Connection</AlertTitle>
              <AlertDescription>Testing database connection...</AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === 'connected' && (
            <Alert>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Database Connected</AlertTitle>
              <AlertDescription>
                Successfully connected to database. 
                Found: {dbStats.sections} sections, {dbStats.projects} projects, {dbStats.blogs} blog posts, {dbStats.profiles} profiles.
              </AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>
                Failed to connect to database. 
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRetryConnection}
                  className="ml-2"
                >
                  Retry Connection
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        {lastError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{lastError}</AlertDescription>
          </Alert>
        )}
        
        <div className="mb-6">
          {isChecking || connectionStatus === 'checking' ? (
            <LoadingStatus />
          ) : allSectionsReady ? (
            <CompletedStatus />
          ) : (
            <AdminSectionStatus onAllSectionsPopulated={handleAllSectionsPopulated} />
          )}
          
          {/* Admin Action Buttons - Always show these regardless of data status */}
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Admin Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={handleInitializeData} 
                disabled={isInitializing || connectionStatus !== 'connected'} 
                variant="default"
              >
                {isInitializing ? 'Initializing...' : 'Initialize Resume Data'}
              </Button>
              <Button 
                onClick={handleForceInitializeData}
                disabled={isInitializing || connectionStatus !== 'connected'}
                variant="destructive"
              >
                Reset Resume Data
              </Button>
              <Button 
                onClick={navigateToResumePage}
                variant="outline"
                className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
              >
                Manage Resume
              </Button>
              <Button 
                onClick={handleCheckDatabaseStatus}
                variant="secondary"
                disabled={isChecking}
              >
                {isChecking ? 'Checking...' : 'Check Database Status'}
              </Button>
            </div>
            
            {/* Quick Navigation Links */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Navigation</h4>
              <div className="flex flex-wrap gap-2 text-sm">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/admin#blog')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Blog Posts
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/admin#portfolio')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Portfolio Projects
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/admin#users')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  User Management
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {connectionStatus === 'connected' && <CardGrid />}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
