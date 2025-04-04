
import React from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from './AdminSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not admin
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (!isAdmin) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) {
    return null; // Prevent any flash of content before redirect
  }

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-gray-50">
        <AdminSidebar />
        <SidebarInset className="p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
