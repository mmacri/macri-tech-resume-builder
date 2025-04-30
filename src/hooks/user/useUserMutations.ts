
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserProfile } from '@/types/user';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook for user mutations: update, add, delete
 */
export function useUserMutations() {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();

  // Update user profile
  const updateMutation = useMutation({
    mutationFn: async (user: Partial<UserProfile>) => {
      if (!user.id) throw new Error('User ID is required');
      
      console.log('Updating user profile:', user);
      const { id, email, ...profileData } = user;
      
      // Safety check: prevent removing admin status from your own account
      if (id === currentUser?.id && 
          profileData.is_admin === false) {
        throw new Error('You cannot remove admin status from your own account');
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating user:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User updated successfully');
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error);
      toast.error(`Error updating user: ${error.message}`);
    }
  });

  // Add user function
  const addMutation = useMutation({
    mutationFn: async (userData: Partial<UserProfile>) => {
      console.log('Adding new user profile:', userData);
      
      // Ensure that the ID field is present and a valid UUID
      if (!userData.id) {
        userData.id = crypto.randomUUID();
      }
      
      // Prepare the data with required fields
      const userDataWithId = {
        id: userData.id,
        full_name: userData.full_name || null,
        username: userData.username || null,
        is_admin: userData.is_admin || false,
      };
      
      const { data, error } = await supabase
        .from('profiles')
        .insert(userDataWithId)
        .select()
        .single();
      
      if (error) {
        console.error('Error adding user:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User added successfully');
    },
    onError: (error: Error) => {
      console.error('Add user mutation error:', error);
      toast.error(`Error adding user: ${error.message}`);
    }
  });

  // Delete user function with admin safeguard
  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      console.log('Deleting user profile with ID:', userId);
      
      // Safety check: prevent deleting your own account
      if (userId === currentUser?.id) {
        throw new Error('You cannot delete your own account');
      }
      
      // First check if this is the last admin user
      const { data: adminUsers, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('is_admin', true);
      
      if (checkError) {
        throw new Error(`Failed to check admin users: ${checkError.message}`);
      }
      
      if (adminUsers.length === 1 && adminUsers[0].id === userId) {
        throw new Error('Cannot delete the last admin user');
      }
      
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (error) {
        console.error('Error deleting user:', error);
        throw error;
      }
      
      return userId;
    },
    onSuccess: (userId) => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User deleted successfully');
      console.log('Successfully deleted user with ID:', userId);
    },
    onError: (error: Error) => {
      console.error('Delete mutation error:', error);
      toast.error(`Error deleting user: ${error.message}`);
    }
  });

  return {
    updateMutation,
    addMutation,
    deleteMutation
  };
}
