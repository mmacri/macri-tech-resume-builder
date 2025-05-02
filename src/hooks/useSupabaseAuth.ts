
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

export function useSupabaseAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const checkIfAdmin = async (userId: string) => {
    try {
      console.log('Checking admin status for user ID:', userId);
      
      // First, check if the user's email matches any of our known admin emails
      const { data: userData } = await supabase.auth.getUser();
      const email = userData?.user?.email?.toLowerCase();
      
      // Always set known admins to true immediately
      const isKnownAdmin = email === 'mike@mikemacri.com' || email === 'mike@gmail.com';
      if (isKnownAdmin) {
        console.log('User has a known admin email address, setting as admin');
        setIsAdmin(true);
        
        // Also ensure their profile has admin status
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ is_admin: true })
          .eq('id', userId);
          
        if (updateError) {
          console.error('Error updating admin status in profile:', updateError);
        }
      }
      
      // Try the new is_user_admin function first
      try {
        console.log('Checking admin status using is_user_admin function');
        const { data: isAdminResult, error: rpcError } = await supabase
          .rpc('is_user_admin', { user_id: userId });
          
        if (rpcError) {
          console.error('Error checking is_user_admin via RPC:', rpcError);
        } else {
          console.log('Admin status via is_user_admin RPC:', isAdminResult);
          setIsAdmin(isAdminResult || isKnownAdmin);
          setIsLoading(false);
          return;
        }
      } catch (rpcError) {
        console.error('Exception in is_user_admin RPC check:', rpcError);
      }
      
      // Fall back to is_admin function
      try {
        console.log('Falling back to is_admin function');
        const { data: isAdminResult, error: rpcError } = await supabase
          .rpc('is_admin', { user_id: userId });
          
        if (rpcError) {
          console.error('Error checking admin via is_admin RPC:', rpcError);
        } else {
          console.log('Admin status via is_admin RPC:', isAdminResult);
          setIsAdmin(isAdminResult || isKnownAdmin);
          setIsLoading(false);
          return;
        }
      } catch (rpcError) {
        console.error('Exception in is_admin RPC check:', rpcError);
      }
      
      // Last resort: check profiles table directly
      fallbackAdminCheck(userId, isKnownAdmin);
      
    } catch (error) {
      console.error('Error in admin check flow:', error);
      // If all else fails, use known admin email check
      const { data: userData } = await supabase.auth.getUser();
      const email = userData?.user?.email?.toLowerCase();
      const isKnownAdmin = email === 'mike@mikemacri.com' || email === 'mike@gmail.com';
      setIsAdmin(isKnownAdmin);
      setIsLoading(false);
    }
  };

  // Fallback method to check admin status directly from profiles table
  const fallbackAdminCheck = async (userId: string, isKnownAdmin: boolean) => {
    try {
      console.log('Performing fallback admin check');
      // Check if user has a profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .maybeSingle();
      
      if (profileError) {
        console.error('Error checking profile:', profileError);
        // Attempt to run the sync function if profile not found
        await supabase.rpc('sync_missing_profiles');
        
        // Try one more time after sync
        const { data: syncedProfile, error: syncError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', userId)
          .maybeSingle();
        
        if (syncError) {
          console.error('Error after sync:', syncError);
          setIsAdmin(isKnownAdmin); // Fall back to email check
        } else if (syncedProfile) {
          console.log('Admin status after sync:', syncedProfile.is_admin);
          setIsAdmin(syncedProfile.is_admin || isKnownAdmin);
        } else {
          console.log('No profile found after sync');
          setIsAdmin(isKnownAdmin); // Fall back to email check
        }
      } else if (profile) {
        console.log('Admin status from database:', profile.is_admin);
        setIsAdmin(profile.is_admin || isKnownAdmin);
      } else {
        console.log('No profile found, running sync');
        try {
          await supabase.rpc('sync_missing_profiles');
        } catch (syncError) {
          console.error('Error running sync_missing_profiles:', syncError);
        }
        
        // Fall back to email check
        setIsAdmin(isKnownAdmin);
      }
    } catch (error) {
      console.error('Error in fallback admin check:', error);
      setIsAdmin(isKnownAdmin); // Fall back to email check
    } finally {
      setIsLoading(false);
    }
  };

  // Add a function to set admin status for a user
  const setAdminStatus = async (userId: string, adminStatus: boolean) => {
    try {
      console.log('Setting admin status for user ID:', userId, 'to:', adminStatus);
      
      // Safety check: prevent removing admin status from your own account
      if (user && user.id === userId && !adminStatus) {
        toast.error('You cannot remove admin status from your own account');
        return false;
      }
      
      // Check if this would remove the last admin
      if (!adminStatus) {
        const { data: adminUsers, error: checkError } = await supabase
          .from('profiles')
          .select('id')
          .eq('is_admin', true);
          
        if (checkError) {
          console.error('Error checking admin users:', checkError);
          toast.error('Could not verify admin users');
          return false;
        }
        
        if (adminUsers.length === 1 && adminUsers[0].id === userId) {
          toast.error('Cannot remove admin status from the last admin user');
          return false;
        }
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: adminStatus })
        .eq('id', userId);
        
      if (error) {
        console.error('Error updating admin status:', error);
        toast.error(error.message || 'Error updating admin status');
        return false;
      } else {
        console.log('Admin status updated successfully');
        if (user && user.id === userId) {
          setIsAdmin(adminStatus);
        }
        toast.success(`User admin status ${adminStatus ? 'granted' : 'removed'} successfully`);
        return true;
      }
    } catch (error) {
      console.error('Error updating admin status:', error);
      toast.error('Error updating admin status');
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
