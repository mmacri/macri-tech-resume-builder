
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserProfile } from '@/types/user';

/**
 * Hook for querying users from the profiles table
 */
export function useUserQuery() {
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      console.log('Fetching users from profiles table...');
      try {
        // First check if we need to sync existing profiles
        const { data: authUser } = await supabase.auth.getUser();
        const currentUserId = authUser?.user?.id;
        
        if (currentUserId) {
          // Check if the current user has a profile
          const { data: currentProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', currentUserId)
            .maybeSingle();
            
          // If not, we might need to run the sync function
          if (!currentProfile) {
            console.log('Current user has no profile. Running sync function...');
            await supabase.rpc('sync_missing_profiles');
            toast.success('User profiles synchronized');
          }
        }
        
        // Now fetch all profiles
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
          return [];
        }
        
        console.log(`Found ${profiles.length} users in the database`);
        
        // Return the profiles with email info
        return profiles.map(profile => ({
          ...profile,
          email: profile.username || 'No email available',
        })) as UserProfile[];
      } catch (err) {
        console.error('Unexpected error in useUserQuery:', err);
        toast.error(`Failed to fetch users: ${err instanceof Error ? err.message : 'Unknown error'}`);
        throw err;
      }
    }
  });

  return {
    users,
    isLoading,
    error,
    refetch
  };
}
