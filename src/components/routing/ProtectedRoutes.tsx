
import React from 'react';
import { Navigate } from 'react-router-dom';
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
  
  if (isLoading) return <div className="p-8 flex justify-center">Loading...</div>;
  
  if (!user) {
    return <Navigate to="/auth?redirectTo=/admin-dashboard" replace />;
  }
  
  if (requiresAdmin && !isAdmin) {
    toast.error("You don't have permission to access the admin area");
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ProtectedRoute requiresAdmin>{children}</ProtectedRoute>;
};
