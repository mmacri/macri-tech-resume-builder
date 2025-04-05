
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminBlogPosts from '@/components/admin/AdminBlogPosts';
import AdminPortfolioProjects from '@/components/admin/AdminPortfolioProjects';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminResume from '@/components/admin/AdminResume';
import AdminSectionStatus from '@/components/admin/AdminSectionStatus';

const Admin = () => {
  const location = useLocation();
  const hash = location.hash.replace('#', '') || 'blog';
  
  useEffect(() => {
    if (!location.hash) {
      // Default to blog section if no hash is present
      window.location.hash = 'blog';
    }
  }, [location.hash]);

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
        <AdminSectionStatus />
        {renderComponent()}
      </div>
    </AdminLayout>
  );
};

export default Admin;
