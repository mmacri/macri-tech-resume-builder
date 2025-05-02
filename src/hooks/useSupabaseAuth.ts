
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useAdminCheck } from './auth/useAdminCheck';
import { useAdminManagement } from './auth/useAdminManagement';

export function useSupabaseAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use our smaller, focused hooks
  const { isAdmin, setIsAdmin, checkIfAdmin } = useAdminCheck();
  const { setAdminStatus } = useAdminManagement(user, setIsAdmin);

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Check if user is admin - use setTimeout to prevent potential deadlocks
        if (currentSession?.user) {
          setTimeout(() => {
            checkIfAdmin(currentSession.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Got existing session:', currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Check if user is admin
      if (currentSession?.user) {
        checkIfAdmin(currentSession.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    user,
    isAdmin,
    isLoading,
    setAdminStatus
  };
}
