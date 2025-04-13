
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const initializeProfile = async () => {
  try {
    console.log('Initializing profile...');
    
    // Define a default profile ID to use when no auth user is available
    const defaultProfileId = '00000000-0000-0000-0000-000000000000';
    
    // Check if we have a profile
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (profilesError) {
      console.error('Error checking for existing profiles:', profilesError);
      toast.error(`Database error: ${profilesError.message}`);
      
      // Return default ID to prevent cascading failures
      return defaultProfileId;
    }
    
    // If profiles exist, use the first one
    if (profiles && profiles.length > 0) {
      console.log('Using existing profile:', profiles[0].id);
      return profiles[0].id;
    }
    
    console.log('No profiles found, creating default profile');
    
    // Try to get authenticated user or use the default ID
    const { data: authData } = await supabase.auth.getUser();
    const profileId = authData?.user?.id || defaultProfileId;
    
    // Check if this specific profile already exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', profileId)
      .maybeSingle();
      
    if (checkError) {
      console.error('Error checking for specific profile:', checkError);
      toast.error(`Database error: ${checkError.message}`);
      
      // Return default ID to prevent cascading failures
      return defaultProfileId;
    }
    
    // Only create if this specific profile doesn't exist
    if (!existingProfile) {
      console.log('Creating profile with ID:', profileId);
      
      // Try to create the profile with the user's ID first
      try {
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: profileId,
            full_name: 'Mike Macri',
            username: authData?.user?.email || 'mike@example.com',
            is_admin: true
          })
          .select()
          .single();
          
        if (createError) {
          throw createError;
        }
        
        console.log('Successfully created profile:', newProfile);
        toast.success('Profile created successfully');
        return profileId;
      } catch (createError: any) {
        console.error('Error creating profile:', createError);
        toast.error(`Failed to create profile: ${createError.message}`);
        
        // If there was an error with the specific ID, try with the default ID directly
        if (profileId !== defaultProfileId) {
          console.log('Trying to create with default profile ID...');
          
          try {
            const { data: fallbackProfile, error: fallbackError } = await supabase
              .from('profiles')
              .insert({
                id: defaultProfileId,
                full_name: 'Mike Macri',
                username: 'mike@example.com',
                is_admin: true
              })
              .select()
              .single();
              
            if (fallbackError) {
              throw fallbackError;
            }
            
            console.log('Created fallback profile:', fallbackProfile);
            toast.success('Created fallback profile');
            return defaultProfileId;
          } catch (fallbackError: any) {
            console.error('Error creating fallback profile:', fallbackError);
            toast.error(`Failed to create fallback profile: ${fallbackError.message}`);
            return defaultProfileId;
          }
        }
        
        return defaultProfileId;
      }
    } else {
      console.log('Profile already exists with ID:', profileId);
      return profileId;
    }
  } catch (error) {
    console.error('Error initializing profile:', error);
    toast.error(`Error initializing profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    // Return the default profile ID even if there's an error, to prevent cascading failures
    return '00000000-0000-0000-0000-000000000000';
  }
};
