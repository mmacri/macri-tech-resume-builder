
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserProfile } from '@/types/user';

export function useUserManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<UserProfile> | null>(null);
  const queryClient = useQueryClient();

  // Fetch users with profiles
  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Fetch emails for profiles
      const usersWithEmails = await Promise.all(
        profiles.map(async (profile) => {
          try {
            // Get user email from auth.users via admin API (if available) or use an empty string
            // In a production app, you would use an edge function with admin rights
            return {
              ...profile,
              email: profile.username || '' // fallback to username as we can't directly query auth.users
            };
          } catch (err) {
            console.error('Error fetching user email:', err);
            return { ...profile, email: '' };
          }
        })
      );
      
      return usersWithEmails as UserProfile[];
    }
  });

  // Update user profile
  const mutation = useMutation({
    mutationFn: async (user: Partial<UserProfile>) => {
      if (!user.id) throw new Error('User ID is required');
      
      const { id, email, ...profileData } = user;
      
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('User updated successfully');
      setIsDialogOpen(false);
      setCurrentUser(null);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
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
    mutation.mutate({
      id: user.id,
      is_admin: !user.is_admin
    });
  };

  return {
    users,
    isLoading,
    mutation,
    currentUser,
    setCurrentUser,
    isDialogOpen,
    setIsDialogOpen,
    handleEditUser,
    handleSubmit,
    toggleAdmin
  };
}
