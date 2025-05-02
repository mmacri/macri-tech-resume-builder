
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  isKnownAdminEmail,
  checkAdminViaRPC, 
  checkAdminViaLegacyRPC, 
  checkAdminViaProfilesTable,
  syncProfilesAndCheckAdmin
} from '@/utils/auth/adminChecker';

export function useAdminCheck() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  /**
   * Comprehensive admin check that tries multiple methods
   */
  const checkIfAdmin = async (userId: string): Promise<void> => {
    try {
      console.log('Checking admin status for user ID:', userId);
      
      // First, check if the user's email matches any of our known admin emails
      const { data: userData } = await supabase.auth.getUser();
      const email = userData?.user?.email;
      
      // Always set known admins to true immediately
      const isKnownAdmin = isKnownAdminEmail(email);
      if (isKnownAdmin) {
        console.log('User has a known admin email address, setting as admin');
        setIsAdmin(true);
        
        // Also ensure their profile has admin status
        await supabase
          .from('profiles')
          .update({ is_admin: true })
          .eq('id', userId);
          
        return;
      }
      
      // Try different methods to check admin status
      
      // Method 1: Check via RPC function
      const rpcResult = await checkAdminViaRPC(userId);
      if (rpcResult !== null) {
        setIsAdmin(rpcResult || isKnownAdmin);
        return;
      }
      
      // Method 2: Check via legacy RPC function
      const legacyRpcResult = await checkAdminViaLegacyRPC(userId);
      if (legacyRpcResult !== null) {
        setIsAdmin(legacyRpcResult || isKnownAdmin);
        return;
      }
      
      // Method 3: Check profiles table directly
      const profileResult = await checkAdminViaProfilesTable(userId);
      if (profileResult !== null) {
        setIsAdmin(profileResult || isKnownAdmin);
        return;
      }
      
      // Method 4: Sync profiles and try again
      const syncResult = await syncProfilesAndCheckAdmin(userId);
      if (syncResult !== null) {
        setIsAdmin(syncResult || isKnownAdmin);
        return;
      }
      
      // Final fallback: just rely on known admin status
      setIsAdmin(isKnownAdmin);
      
    } catch (error) {
      console.error('Error in admin check flow:', error);
      // If all else fails, use known admin email check
      const { data: userData } = await supabase.auth.getUser();
      const email = userData?.user?.email;
      setIsAdmin(isKnownAdminEmail(email));
    }
  };

  return {
    isAdmin,
    setIsAdmin,
    checkIfAdmin
  };
}
