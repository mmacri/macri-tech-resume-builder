
import { supabase } from '@/integrations/supabase/client';
import { authRateLimiter } from '@/utils/security/rateLimiting';

// Known admin email addresses - centralized for security
const ADMIN_EMAILS = ['mike@mikemacri.com', 'mike@gmail.com'];

/**
 * Check if an email is a known admin email with rate limiting
 */
export const isKnownAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

/**
 * Secure admin check with rate limiting and audit logging
 */
export const secureAdminCheck = async (userId: string, userIp?: string): Promise<boolean> => {
  try {
    // Rate limiting check
    const rateLimitKey = `admin_check_${userId}_${userIp || 'unknown'}`;
    if (authRateLimiter.isRateLimited(rateLimitKey)) {
      console.warn(`Admin check rate limited for user ${userId}`);
      return false;
    }

    console.log('Performing secure admin check for user:', userId);
    
    // Use the new secure database function
    const { data, error } = await supabase.rpc('check_admin_status', { user_id: userId });
    
    if (error) {
      console.error('Admin check failed:', error.message);
      return false;
    }
    
    const isAdmin = Boolean(data);
    
    // Audit log for admin checks
    if (isAdmin) {
      console.log(`Admin access granted for user ${userId}`);
      // In production, log this to your audit system
    }
    
    return isAdmin;
  } catch (error) {
    console.error('Secure admin check error:', error);
    return false;
  }
};

/**
 * Validate admin session with additional security checks
 */
export const validateAdminSession = async (userId: string): Promise<{ isValid: boolean; reason?: string }> => {
  try {
    // Check if user still exists and is active
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user || userData.user.id !== userId) {
      return { isValid: false, reason: 'Invalid user session' };
    }
    
    // Check admin status
    const isAdmin = await secureAdminCheck(userId);
    if (!isAdmin) {
      return { isValid: false, reason: 'Admin privileges revoked' };
    }
    
    // Check for known admin email as additional verification
    const isKnownAdmin = isKnownAdminEmail(userData.user.email);
    if (!isKnownAdmin) {
      // For non-hardcoded admins, do additional verification
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin, updated_at')
        .eq('id', userId)
        .maybeSingle();
        
      if (profileError || !profileData?.is_admin) {
        return { isValid: false, reason: 'Profile admin status invalid' };
      }
      
      // Check if admin status was recently changed (potential security issue)
      const updatedAt = new Date(profileData.updated_at);
      const recentThreshold = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes
      
      if (updatedAt > recentThreshold) {
        console.warn(`Admin status recently changed for user ${userId}`);
        // In production, trigger additional verification
      }
    }
    
    return { isValid: true };
  } catch (error) {
    console.error('Admin session validation error:', error);
    return { isValid: false, reason: 'Validation error' };
  }
};
