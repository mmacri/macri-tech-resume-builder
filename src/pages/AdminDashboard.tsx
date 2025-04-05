
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminSectionStatus from '@/components/admin/AdminSectionStatus';
import { toast } from 'sonner';
import CardGrid from '@/components/admin/dashboard/CardGrid';
import UserManagementCard from '@/components/admin/dashboard/UserManagementCard';
import QuickTipsCard from '@/components/admin/dashboard/QuickTipsCard';

const AdminDashboard = () => {
  const [allSectionsReady, setAllSectionsReady] = useState(false);
  
  const handleAllSectionsPopulated = () => {
    setAllSectionsReady(true);
    toast.success('All content sections are now populated with data!');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <AdminSectionStatus onAllSectionsPopulated={handleAllSectionsPopulated} />
        
        <CardGrid />
        <UserManagementCard />
        <QuickTipsCard />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
