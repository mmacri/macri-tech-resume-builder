
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import AuthCard from '@/components/auth/AuthCard';

const Auth = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(searchParams.get('reset') ? 'reset' : 'login');
  
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

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log('User is logged in, checking admin status:', isAdmin);
      
      // Redirect admin users to admin dashboard
      if (isAdmin) {
        console.log('Admin user detected, redirecting to admin dashboard');
        navigate('/admin');
      } else {
        console.log('Regular user detected, redirecting to home');
        navigate('/');
      }
    }
  }, [user, isAdmin, navigate]);

  return (
    <div className="w-full px-6 py-12 md:px-12 flex items-center justify-center min-h-[80vh]">
      <AuthCard 
        authError={authError}
        setAuthError={setAuthError}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default Auth;
