
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminSectionStatus from '@/components/admin/AdminSectionStatus';
import { toast } from 'sonner';
import CardGrid from '@/components/admin/dashboard/CardGrid';
import { Button } from '@/components/ui/button';
import { useInitializeResumeData } from '@/hooks/useInitializeResumeData';

const AdminDashboard = () => {
  const [allSectionsReady, setAllSectionsReady] = useState(false);
  const { initializeData, isInitializing } = useInitializeResumeData();
  const navigate = useNavigate();
  
  const handleAllSectionsPopulated = () => {
    setAllSectionsReady(true);
    toast.success('All content sections are now populated with data!');
  };

  const handleInitializeData = () => {
    initializeData();
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
          <AdminSectionStatus onAllSectionsPopulated={handleAllSectionsPopulated} />
          
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
