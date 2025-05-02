
import { toast } from 'sonner';
import { updateUserAdminStatus } from '@/utils/auth/adminChecker';
import { User } from '@supabase/supabase-js';

export function useAdminManagement(user: User | null, setIsAdmin: (isAdmin: boolean) => void) {
  /**
   * Set admin status for a user
   */
  const setAdminStatus = async (userId: string, adminStatus: boolean): Promise<boolean> => {
    if (!user) {
      toast.error('You must be logged in to perform this action');
      return false;
    }

    const result = await updateUserAdminStatus(userId, adminStatus, user.id);
    
    if (!result.success) {
      toast.error(result.message || 'Error updating admin status');
      return false;
    }
    
    // Update local state if user is updating their own status
    if (user && user.id === userId) {
      setIsAdmin(adminStatus);
    }
    
    toast.success(`User admin status ${adminStatus ? 'granted' : 'removed'} successfully`);
    return true;
  };

  return {
    setAdminStatus
  };
}
