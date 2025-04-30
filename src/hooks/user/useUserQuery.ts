
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
                is_admin: authData.user.email === 'mike@mikemacri.com' // Make first user an admin if it's your email
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
        console.error('Unexpected error in useUserQuery:', err);
        toast.error(`Failed to fetch users: ${err instanceof Error ? err.message : 'Unknown error'}`);
        return [];
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
