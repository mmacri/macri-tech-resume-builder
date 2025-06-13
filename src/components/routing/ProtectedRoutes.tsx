
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSecurity } from '@/contexts/SecurityContext';
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
  const { validateSession, reportSecurityEvent } = useSecurity();
  const location = useLocation();
  
  // Security validation on route access
  useEffect(() => {
    if (user && !validateSession()) {
      reportSecurityEvent('INVALID_SESSION_ACCESS', {
        userId: user.id,
        route: location.pathname,
        requiresAdmin
      });
      toast.error('Session validation failed. Please sign in again.');
    }
  }, [user, location.pathname, requiresAdmin, validateSession, reportSecurityEvent]);
  
  // Enhanced logging for admin routes
  useEffect(() => {
    if (requiresAdmin && user) {
      console.log('ProtectedRoute - Admin access attempt:', {
        userId: user.id,
        email: user.email,
        isAdmin,
        route: location.pathname,
        timestamp: new Date().toISOString()
      });
      
      // Report admin route access for audit purposes
      if (isAdmin) {
        reportSecurityEvent('ADMIN_ROUTE_ACCESS', {
          userId: user.id,
          email: user.email,
          route: location.pathname
        });
      }
    }
  }, [user, isAdmin, requiresAdmin, location.pathname, reportSecurityEvent]);
  
  if (isLoading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    const currentPath = location.pathname;
    return <Navigate to={`/auth?redirectTo=${currentPath}`} replace />;
  }
  
  // Enhanced admin route protection
  if (requiresAdmin) {
    const isKnownAdmin = user.email === 'mike@mikemacri.com' || user.email === 'mike@gmail.com';
    const effectiveIsAdmin = isAdmin || isKnownAdmin;
    
    if (!effectiveIsAdmin) {
      console.warn('Unauthorized admin access attempt:', {
        userId: user.id,
        email: user.email,
        route: location.pathname,
        isAdmin,
        isKnownAdmin
      });
      
      reportSecurityEvent('UNAUTHORIZED_ADMIN_ACCESS', {
        userId: user.id,
        email: user.email,
        route: location.pathname
      });
      
      toast.error("Access denied: Insufficient privileges");
      return <Navigate to="/" replace />;
    }
  }
  
  return <>{children}</>;
};

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ProtectedRoute requiresAdmin>{children}</ProtectedRoute>;
};
