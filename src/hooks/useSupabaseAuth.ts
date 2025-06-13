
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { secureAdminCheck, validateAdminSession } from '@/utils/auth/secureAdminChecker';
import { toast } from 'sonner';

export function useSupabaseAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up secure auth state listener');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          console.log('User authenticated, performing secure admin check...');
          try {
            // Ensure profile exists first
            await ensureProfileExists(currentSession.user);
            
            // Perform secure admin check
            const adminStatus = await secureAdminCheck(currentSession.user.id);
            setIsAdmin(adminStatus);
            
            // Validate admin session if user is admin
            if (adminStatus) {
              const validation = await validateAdminSession(currentSession.user.id);
              if (!validation.isValid) {
                console.warn('Admin session validation failed:', validation.reason);
                setIsAdmin(false);
                toast.warning('Admin session validation failed. Please sign in again.');
              }
            }
          } catch (error) {
            console.error('Error during secure auth state processing:', error);
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

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('Got existing session:', currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        try {
          // Ensure profile exists first
          await ensureProfileExists(currentSession.user);
          
          // Perform secure admin check
          const adminStatus = await secureAdminCheck(currentSession.user.id);
          setIsAdmin(adminStatus);
          
          // Validate admin session if user is admin
          if (adminStatus) {
            const validation = await validateAdminSession(currentSession.user.id);
            if (!validation.isValid) {
              console.warn('Admin session validation failed:', validation.reason);
              setIsAdmin(false);
            }
          }
        } catch (error) {
          console.error('Error during secure session processing:', error);
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

  // Secure admin status setter with validation
  const setAdminStatus = async (userId: string, adminStatus: boolean): Promise<boolean> => {
    try {
      // Only allow admin users to change admin status
      if (!isAdmin) {
        toast.error('Unauthorized: Only admins can change admin status');
        return false;
      }

      // Prevent self-demotion
      if (userId === user?.id && !adminStatus) {
        toast.error('You cannot remove your own admin privileges');
        return false;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: adminStatus })
        .eq('id', userId);

      if (error) {
        console.error('Failed to update admin status:', error);
        toast.error(`Failed to update admin status: ${error.message}`);
        return false;
      }

      // Update local state if user is updating their own status
      if (user && user.id === userId) {
        setIsAdmin(adminStatus);
      }

      console.log(`Admin status ${adminStatus ? 'granted' : 'revoked'} for user ${userId}`);
      toast.success(`Admin status ${adminStatus ? 'granted' : 'revoked'} successfully`);
      return true;
    } catch (error) {
      console.error('Error updating admin status:', error);
      toast.error('Failed to update admin status');
      return false;
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
