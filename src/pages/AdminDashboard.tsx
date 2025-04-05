
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

const AdminDashboard = () => {
  const [allSectionsReady, setAllSectionsReady] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { initializeData, isInitializing } = useInitializeResumeData();
  const navigate = useNavigate();
  
  // Check if content exists in the database
  useEffect(() => {
    const checkContent = async () => {
      try {
        setIsChecking(true);
        
        // Check resume sections
        const { count: sectionCount, error: sectionError } = await supabase
          .from('resume_sections')
          .select('*', { count: 'exact', head: true });
          
        if (sectionError) throw sectionError;
        
        // Check portfolio projects
        const { count: projectCount, error: projectError } = await supabase
          .from('portfolio_projects')
          .select('*', { count: 'exact', head: true });
          
        if (projectError) throw projectError;
        
        // Check blog posts
        const { count: blogCount, error: blogError } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true });
          
        if (blogError) throw blogError;
        
        // Set status based on whether content exists
        setAllSectionsReady(
          (sectionCount || 0) > 0 && 
          (projectCount || 0) > 0 &&
          (blogCount || 0) > 0
        );
      } catch (error) {
        console.error('Error checking content:', error);
        toast.error('Failed to check content status');
      } finally {
        setIsChecking(false);
      }
    };
    
    checkContent();
  }, [isInitializing]);
  
  const handleAllSectionsPopulated = () => {
    setAllSectionsReady(true);
    toast.success('All content sections are now populated with data!');
  };

  const handleInitializeData = () => {
    initializeData({});
  };

  const handleForceInitializeData = () => {
    if (window.confirm('This will reset all resume data with fresh sample data. Are you sure?')) {
      initializeData({ force: true });
    }
  };

  const navigateToResumePage = () => {
    navigate('/admin#resume');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="mb-6">
          {isChecking ? (
            <LoadingStatus />
          ) : allSectionsReady ? (
            <CompletedStatus />
          ) : (
            <AdminSectionStatus onAllSectionsPopulated={handleAllSectionsPopulated} />
          )}
          
          {!allSectionsReady && (
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
            </div>
          )}
        </div>
        
        <CardGrid />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
