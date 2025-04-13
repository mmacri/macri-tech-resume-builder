
import { supabase } from '@/integrations/supabase/client';

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
    }
    
    // If profiles exist, use the first one
    if (profiles && profiles.length > 0) {
      console.log('Using existing profile:', profiles[0].id);
      return profiles[0].id;
    }
    
    console.log('No profiles found, creating default admin profile');
    
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
    }
    
    // Only create if this specific profile doesn't exist
    if (!existingProfile) {
      console.log('Creating profile with ID:', profileId);
      
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          id: profileId,
          full_name: 'Admin User',
          username: authData?.user?.email || 'admin@example.com',
          is_admin: true
        })
        .select()
        .single();
        
      if (createError) {
        console.error('Error creating profile:', createError);
        throw createError;
      }
      
      console.log('Successfully created profile:', newProfile);
      return profileId;
    } else {
      console.log('Profile already exists with ID:', profileId);
      return profileId;
    }
  } catch (error) {
    console.error('Error initializing profile:', error);
    throw error;
  }
};
