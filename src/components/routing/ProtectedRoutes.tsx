
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresAdmin = false 
}) => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();
  
  // Add logging for debugging
  useEffect(() => {
    if (requiresAdmin) {
      console.log('ProtectedRoute - Admin required:', requiresAdmin);
      console.log('ProtectedRoute - User authenticated:', !!user);
      console.log('ProtectedRoute - User admin status:', isAdmin);
    }
  }, [user, isAdmin, requiresAdmin]);
  
  if (isLoading) {
    return <div className="p-8 flex justify-center">Loading...</div>;
  }
  
  if (!user) {
    const currentPath = location.pathname;
    return <Navigate to={`/auth?redirectTo=${currentPath}`} replace />;
  }
  
  // Admin route check
  if (requiresAdmin && !isAdmin) {
    toast.error("You don't have permission to access the admin area");
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ProtectedRoute requiresAdmin>{children}</ProtectedRoute>;
};
