
import { useState } from 'react';
import { comprehensiveAdminCheck } from '@/utils/auth/adminChecker';

export function useAdminCheck() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  /**
   * Comprehensive admin check that tries multiple methods and handles errors gracefully
   */
  const checkIfAdmin = async (userId: string): Promise<void> => {
    try {
      console.log('useAdminCheck: Checking admin status for user ID:', userId);
      
      const adminStatus = await comprehensiveAdminCheck(userId);
      console.log('useAdminCheck: Final admin status:', adminStatus);
      
      setIsAdmin(adminStatus);
      
    } catch (error) {
      console.error('useAdminCheck: Error in admin check flow:', error);
      // Default to false on error for safety
      setIsAdmin(false);
    }
  };

  return {
    isAdmin,
    setIsAdmin,
    checkIfAdmin
  };
}
