
import { supabase } from '@/integrations/supabase/client';

// Known admin email addresses
const ADMIN_EMAILS = ['mike@mikemacri.com', 'mike@gmail.com'];

/**
 * Check if an email is a known admin email
 */
export const isKnownAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

/**
 * Check admin status via the is_admin RPC function
 */
export const checkAdminViaRPC = async (userId: string): Promise<boolean | null> => {
  try {
    console.log('Checking admin via RPC for user:', userId);
    const { data, error } = await supabase.rpc('is_admin', { user_id: userId });
    
    if (error) {
      console.warn('RPC is_admin failed:', error.message);
      return null;
    }
    
    console.log('RPC admin check result:', data);
    return Boolean(data);
  } catch (error) {
    console.warn('RPC admin check error:', error);
    return null;
  }
};

/**
 * Check admin status via the legacy is_user_admin RPC function
 */
export const checkAdminViaLegacyRPC = async (userId: string): Promise<boolean | null> => {
  try {
    console.log('Checking admin via legacy RPC for user:', userId);
    const { data, error } = await supabase.rpc('is_user_admin', { user_id: userId });
    
    if (error) {
      console.warn('Legacy RPC is_user_admin failed:', error.message);
      return null;
    }
    
    console.log('Legacy RPC admin check result:', data);
    return Boolean(data);
  } catch (error) {
    console.warn('Legacy RPC admin check error:', error);
    return null;
  }
};

/**
 * Check admin status directly from profiles table
 */
export const checkAdminViaProfilesTable = async (userId: string): Promise<boolean | null> => {
  try {
    console.log('Checking admin via profiles table for user:', userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      console.warn('Profiles table admin check failed:', error.message);
      return null;
    }
    
    if (!data) {
      console.log('No profile found for user');
      return null;
    }
    
    console.log('Profiles table admin check result:', data.is_admin);
    return Boolean(data.is_admin);
  } catch (error) {
    console.warn('Profiles table admin check error:', error);
    return null;
  }
};

/**
 * Sync missing profiles and check admin status
 */
export const syncProfilesAndCheckAdmin = async (userId: string): Promise<boolean | null> => {
  try {
    console.log('Syncing profiles and checking admin for user:', userId);
    
    // Call the sync function
    const { error: syncError } = await supabase.rpc('sync_missing_profiles');
    
    if (syncError) {
      console.warn('Profile sync failed:', syncError.message);
      return null;
    }
    
    console.log('Profile sync completed, checking admin status...');
    
    // Now check the profiles table again
    const result = await checkAdminViaProfilesTable(userId);
    console.log('Post-sync admin check result:', result);
    
    return result;
  } catch (error) {
    console.warn('Sync and admin check error:', error);
    return null;
  }
};

/**
 * Update user admin status (for admin management)
 */
export const updateUserAdminStatus = async (
  targetUserId: string, 
  adminStatus: boolean, 
  currentUserId?: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    // Prevent self-demotion for safety
    if (targetUserId === currentUserId && !adminStatus) {
      return {
        success: false,
        message: 'You cannot remove your own admin privileges'
      };
    }
    
    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: adminStatus })
      .eq('id', targetUserId);
    
    if (error) {
      console.error('Failed to update admin status:', error);
      return {
        success: false,
        message: `Failed to update admin status: ${error.message}`
      };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Admin status update error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Comprehensive admin check that tries multiple methods and handles errors gracefully
 */
export const comprehensiveAdminCheck = async (userId: string): Promise<boolean> => {
  try {
    console.log('Starting comprehensive admin check for user:', userId);
    
    // First, check if the user's email matches any known admin emails
    const { data: userData } = await supabase.auth.getUser();
    const email = userData?.user?.email;
    
    const isKnownAdmin = isKnownAdminEmail(email);
    if (isKnownAdmin) {
      console.log('User has known admin email, ensuring profile reflects this...');
      
      // Ensure their profile has admin status
      try {
        await supabase
          .from('profiles')
          .update({ is_admin: true })
          .eq('id', userId);
      } catch (updateError) {
        console.warn('Failed to update profile admin status:', updateError);
      }
      
      return true;
    }
    
    // Try different methods to check admin status
    
    // Method 1: Check via RPC function
    const rpcResult = await checkAdminViaRPC(userId);
    if (rpcResult !== null) {
      return rpcResult;
    }
    
    // Method 2: Check via legacy RPC function
    const legacyRpcResult = await checkAdminViaLegacyRPC(userId);
    if (legacyRpcResult !== null) {
      return legacyRpcResult;
    }
    
    // Method 3: Check profiles table directly
    const profileResult = await checkAdminViaProfilesTable(userId);
    if (profileResult !== null) {
      return profileResult;
    }
    
    // Method 4: Sync profiles and try again
    const syncResult = await syncProfilesAndCheckAdmin(userId);
    if (syncResult !== null) {
      return syncResult;
    }
    
    // Final fallback: return false for safety
    console.log('All admin checks failed, defaulting to false');
    return false;
    
  } catch (error) {
    console.error('Comprehensive admin check failed:', error);
    
    // Final safety check: use known admin email check
    const { data: userData } = await supabase.auth.getUser();
    const email = userData?.user?.email;
    return isKnownAdminEmail(email);
  }
};
