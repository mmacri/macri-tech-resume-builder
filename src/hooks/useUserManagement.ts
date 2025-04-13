
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserProfile } from '@/types/user';

export function useUserManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<UserProfile> | null>(null);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const queryClient = useQueryClient();

  // Fetch users with profiles - improved error handling
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      console.log('Fetching users from profiles table...');
      try {
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching profiles:', error);
          toast.error(`Error fetching users: ${error.message}`);
          throw error;
        }
        
        if (!profiles || profiles.length === 0) {
          console.log('No profiles found in the database');
          
          // Check if the current user exists in the profiles table
          const { data: authData } = await supabase.auth.getUser();
          if (authData?.user) {
            // If current user is authenticated but not in profiles, create profile
            console.log('Creating profile for current authenticated user:', authData.user.email);
            const { data: newProfile, error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: authData.user.id,
                full_name: authData.user.email?.split('@')[0] || 'User',
                username: authData.user.email,
                is_admin: true // Make first user an admin
              })
              .select()
              .single();
              
            if (insertError) {
              console.error('Error creating profile for current user:', insertError);
              toast.error(`Failed to create user profile: ${insertError.message}`);
            } else {
              toast.success('Created user profile for current user');
              // Return the newly created profile as an array
              return [newProfile] as UserProfile[];
            }
          }
          
          return [];
        }
        
        console.log(`Found ${profiles.length} users in the database`);
        
        // Map the profiles to include email information
        return profiles.map(profile => ({
          ...profile,
          email: profile.username || 'No email available',
        })) as UserProfile[];
      } catch (err) {
        console.error('Unexpected error in useUserManagement:', err);
        toast.error(`Failed to fetch users: ${err instanceof Error ? err.message : 'Unknown error'}`);
        return [];
      }
    }
  });

  // Update user profile
  const mutation = useMutation({
    mutationFn: async (user: Partial<UserProfile>) => {
      if (!user.id) throw new Error('User ID is required');
      
      console.log('Updating user profile:', user);
      const { id, email, ...profileData } = user;
      
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
      setIsDialogOpen(false);
      setCurrentUser(null);
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error);
      toast.error(`Error updating user: ${error.message}`);
    }
  });

  // Add user function
  const addUserMutation = useMutation({
    mutationFn: async (userData: Partial<UserProfile>) => {
      console.log('Adding new user profile:', userData);
      
      // Generate a UUID for the user if not provided
      if (!userData.id) {
        userData.id = crypto.randomUUID();
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .insert(userData)
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
      setShowAddUserDialog(false);
    },
    onError: (error: Error) => {
      console.error('Add user mutation error:', error);
      toast.error(`Error adding user: ${error.message}`);
    }
  });

  // Delete user function
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      console.log('Deleting user profile with ID:', userId);
      
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

  const handleEditUser = (user: UserProfile) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && currentUser.id) {
      mutation.mutate(currentUser);
    }
  };

  const toggleAdmin = (user: UserProfile) => {
    console.log(`Toggling admin status for user ${user.full_name || user.username} to ${!user.is_admin}`);
    mutation.mutate({
      id: user.id,
      is_admin: !user.is_admin
    });
  };

  const deleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      deleteUserMutation.mutate(userId);
    }
  };

  const addUser = (userData: Partial<UserProfile>) => {
    addUserMutation.mutate(userData);
  };

  return {
    users,
    isLoading,
    error,
    refetch,
    mutation,
    currentUser,
    setCurrentUser,
    isDialogOpen,
    setIsDialogOpen,
    handleEditUser,
    handleSubmit,
    toggleAdmin,
    deleteUser,
    addUser,
    showAddUserDialog,
    setShowAddUserDialog
  };
}
