
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
      console.log('No profile found for user, syncing profiles...');
      // Try to sync missing profiles
      const { error: syncError } = await supabase.rpc('sync_missing_profiles');
      if (syncError) {
        console.warn('Profile sync failed:', syncError.message);
        return null;
      }
      
      // Try again after sync
      const { data: retryData, error: retryError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .maybeSingle();
        
      if (retryError || !retryData) {
        console.log('Still no profile found after sync');
        return null;
      }
      
      console.log('Profiles table admin check result after sync:', retryData.is_admin);
      return Boolean(retryData.is_admin);
    }
    
    console.log('Profiles table admin check result:', data.is_admin);
    return Boolean(data.is_admin);
  } catch (error) {
    console.warn('Profiles table admin check error:', error);
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
    
    // Method 2: Check profiles table directly with sync
    const profileResult = await checkAdminViaProfilesTable(userId);
    if (profileResult !== null) {
      return profileResult;
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
