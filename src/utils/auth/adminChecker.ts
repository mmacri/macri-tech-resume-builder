
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Check if the user is an admin based on email address
 */
export const isKnownAdminEmail = (email: string | undefined | null): boolean => {
  if (!email) return false;
  const lowerEmail = email.toLowerCase();
  return lowerEmail === 'mike@mikemacri.com' || lowerEmail === 'mike@gmail.com';
};

/**
 * Check admin status using RPC function
 */
export const checkAdminViaRPC = async (userId: string): Promise<boolean | null> => {
  try {
    console.log('Checking admin status using is_user_admin function');
    const { data: isAdminResult, error: rpcError } = await supabase
      .rpc('is_user_admin', { user_id: userId });
      
    if (rpcError) {
      console.error('Error checking is_user_admin via RPC:', rpcError);
      return null;
    }
    
    console.log('Admin status via is_user_admin RPC:', isAdminResult);
    return isAdminResult;
  } catch (rpcError) {
    console.error('Exception in is_user_admin RPC check:', rpcError);
    return null;
  }
};

/**
 * Fallback admin check using legacy RPC function
 */
export const checkAdminViaLegacyRPC = async (userId: string): Promise<boolean | null> => {
  try {
    console.log('Falling back to is_admin function');
    const { data: isAdminResult, error: rpcError } = await supabase
      .rpc('is_admin', { user_id: userId });
      
    if (rpcError) {
      console.error('Error checking admin via is_admin RPC:', rpcError);
      return null;
    }
    
    console.log('Admin status via is_admin RPC:', isAdminResult);
    return isAdminResult;
  } catch (rpcError) {
    console.error('Exception in is_admin RPC check:', rpcError);
    return null;
  }
};

/**
 * Check admin status directly from profiles table
 */
export const checkAdminViaProfilesTable = async (userId: string): Promise<boolean | null> => {
  try {
    console.log('Performing direct profile admin check');
    // Check if user has a profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .maybeSingle();
    
    if (profileError) {
      console.error('Error checking profile:', profileError);
      return null;
    } 
    
    if (profile) {
      console.log('Admin status from database:', profile.is_admin);
      return profile.is_admin;
    }
    
    return null;
  } catch (error) {
    console.error('Error in profile table admin check:', error);
    return null;
  }
};

/**
 * Run the profile sync function and try to get admin status again
 */
export const syncProfilesAndCheckAdmin = async (userId: string): Promise<boolean | null> => {
  try {
    console.log('Running profile sync and checking admin status');
    
    // Attempt to run the sync function
    await supabase.rpc('sync_missing_profiles');
    
    // Try to get profile after sync
    const { data: syncedProfile, error: syncError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .maybeSingle();
    
    if (syncError) {
      console.error('Error after sync:', syncError);
      return null;
    } 
    
    if (syncedProfile) {
      console.log('Admin status after sync:', syncedProfile.is_admin);
      return syncedProfile.is_admin;
    }
    
    console.log('No profile found after sync');
    return null;
  } catch (error) {
    console.error('Error in sync and check:', error);
    return null;
  }
};

/**
 * Function to update admin status for a user
 */
export const updateUserAdminStatus = async (
  userId: string, 
  adminStatus: boolean, 
  currentUserId: string | undefined
): Promise<{success: boolean; message?: string}> => {
  try {
    console.log('Setting admin status for user ID:', userId, 'to:', adminStatus);
    
    // Safety check: prevent removing admin status from your own account
    if (currentUserId === userId && !adminStatus) {
      return { 
        success: false, 
        message: 'You cannot remove admin status from your own account'
      };
    }
    
    // Check if this would remove the last admin
    if (!adminStatus) {
      const { data: adminUsers, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('is_admin', true);
        
      if (checkError) {
        console.error('Error checking admin users:', checkError);
        return {
          success: false,
          message: 'Could not verify admin users'
        };
      }
      
      if (adminUsers.length === 1 && adminUsers[0].id === userId) {
        return {
          success: false,
          message: 'Cannot remove admin status from the last admin user'
        };
      }
    }
    
    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: adminStatus })
      .eq('id', userId);
      
    if (error) {
      console.error('Error updating admin status:', error);
      return {
        success: false,
        message: error.message || 'Error updating admin status'
      };
    }
    
    console.log('Admin status updated successfully');
    return { success: true };
  } catch (error) {
    console.error('Error updating admin status:', error);
    return { 
      success: false, 
      message: 'Error updating admin status'
    };
  }
};
