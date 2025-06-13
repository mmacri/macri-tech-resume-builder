
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
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          console.log('User authenticated, checking admin status...');
          try {
            // Ensure profile exists first
            await ensureProfileExists(currentSession.user);
            
            // Then check admin status
            await checkIfAdmin(currentSession.user.id);
          } catch (error) {
            console.error('Error during auth state processing:', error);
            setIsAdmin(false);
          } finally {
            setIsLoading(false);
          }
        } else {
          console.log('User not authenticated');
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('Got existing session:', currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        try {
          // Ensure profile exists first
          await ensureProfileExists(currentSession.user);
          
          // Then check admin status
          await checkIfAdmin(currentSession.user.id);
        } catch (error) {
          console.error('Error during session processing:', error);
          setIsAdmin(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Helper function to ensure profile exists
  const ensureProfileExists = async (user: User) => {
    try {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, is_admin')
        .eq('id', user.id)
        .maybeSingle();

      if (!existingProfile) {
        console.log('No profile found, creating one...');
        
        // Create profile with admin status based on email
        const isKnownAdmin = user.email === 'mike@mikemacri.com' || user.email === 'mike@gmail.com';
        
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            username: user.email,
            full_name: isKnownAdmin ? 'Mike Macri, M.B.A.' : (user.email || 'New User'),
            is_admin: isKnownAdmin
          });

        if (insertError) {
          console.error('Error creating profile:', insertError);
          // Try to sync profiles using the database function
          await supabase.rpc('sync_missing_profiles');
        } else {
          console.log('Profile created successfully');
        }
      }
    } catch (error) {
      console.error('Error ensuring profile exists:', error);
    }
  };

  return {
    session,
    user,
    isAdmin,
    isLoading,
    setAdminStatus
  };
}
