
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import AuthCard from '@/components/auth/AuthCard';

const Auth = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Determine the active tab based on URL path or query param
  const getInitialTab = () => {
    if (location.pathname === '/register') return 'signup';
    if (location.pathname === '/reset') return 'reset';
    return searchParams.get('reset') ? 'reset' : 'login';
  };
  
  const [activeTab, setActiveTab] = useState<string>(getInitialTab());
  
  // Check for hash params that might contain recovery token
  useEffect(() => {
    const checkForRecoveryToken = async () => {
      // Check for hash params from password reset email
      if (window.location.hash && window.location.hash.includes('type=recovery')) {
        console.log('Found recovery hash:', window.location.hash);
        setActiveTab('reset');
        try {
          // Process the hash to allow password reset
          const { data, error } = await supabase.auth.refreshSession();
          
          if (error) {
            console.error('Error processing recovery token:', error);
            toast.error('Invalid or expired recovery link');
          } else if (data.session) {
            console.log('Successfully authenticated with recovery token');
            toast.success('You can now set a new password');
            // Redirect to home page after successful authentication
            navigate('/');
          }
        } catch (error) {
          console.error('Error processing recovery token:', error);
          toast.error('Error processing recovery token');
        }
      }
    };
    
    checkForRecoveryToken();
  }, [navigate]);

  // Update document title based on active tab
  useEffect(() => {
    document.title = `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} | My App`;
  }, [activeTab]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log('User is logged in, checking admin status:', isAdmin);
      
      // Get the redirect path from the URL or default to home
      const redirectTo = searchParams.get('redirectTo') || (isAdmin ? '/admin' : '/');
      navigate(redirectTo);
    }
  }, [user, isAdmin, navigate, searchParams]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <AuthCard 
          authError={authError}
          setAuthError={setAuthError}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default Auth;
