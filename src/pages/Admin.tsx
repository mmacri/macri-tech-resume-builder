
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminBlogPosts from '@/components/admin/AdminBlogPosts';
import AdminPortfolioProjects from '@/components/admin/AdminPortfolioProjects';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminResume from '@/components/admin/AdminResume';
import AdminSectionStatus from '@/components/admin/AdminSectionStatus';
import { useInitializeResumeData } from '@/hooks/resume/useInitializeResumeData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Admin = () => {
  const location = useLocation();
  const hash = location.hash.replace('#', '') || 'blog';
  const { initializeData, isInitializing } = useInitializeResumeData();
  
  useEffect(() => {
    if (!location.hash) {
      // Default to blog section if no hash is present
      window.location.hash = 'blog';
    }
  }, [location.hash]);

  const handleAllSectionsPopulated = () => {
    console.log('All sections are populated with data');
    toast.success('All resume sections are populated with data!');
  };

  const handleInitializeData = () => {
    initializeData({});
  };

  const handleForceInitializeData = () => {
    if (window.confirm('This will reset all resume data with fresh sample data. Are you sure?')) {
      initializeData({ force: true });
    }
  };

  const renderComponent = () => {
    switch (hash) {
      case 'blog':
        return <AdminBlogPosts />;
      case 'portfolio':
        return <AdminPortfolioProjects />;
      case 'users':
        return <AdminUsers />;
      case 'resume':
        return <AdminResume />;
      default:
        return <AdminBlogPosts />;
    }
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <div className="mb-6">
          <AdminSectionStatus onAllSectionsPopulated={handleAllSectionsPopulated} />
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
          </div>
        </div>
        {renderComponent()}
      </div>
    </AdminLayout>
  );
};

export default Admin;
