
import { supabase } from '@/integrations/supabase/client';

export const initializeProfile = async () => {
  try {
    // Check if we have a profile
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    // Instead of checking profiles.length, we'll directly create the profile if needed
    let profileId;
    
    if (!profiles || profiles.length === 0) {
      console.log('Creating default admin profile');
      // Use authenticated user or fallback to a sample UUID
      const { data: authData } = await supabase.auth.getUser();
      profileId = authData?.user?.id || '00000000-0000-0000-0000-000000000000';
      
      // Check if this profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', profileId)
        .maybeSingle();
        
      if (!existingProfile) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: profileId,
            full_name: 'Michael Macri',
            username: authData?.user?.email || 'admin@example.com',
            is_admin: true
          });
          
        if (profileError) {
          console.error('Error creating profile:', profileError);
          throw profileError;
        }
      } else {
        console.log('Profile already exists:', existingProfile.id);
        profileId = existingProfile.id;
      }
    } else {
      profileId = profiles[0].id;
      console.log('Using existing profile:', profileId);
    }
    
    return profileId;
  } catch (error) {
    console.error('Error initializing profile:', error);
    throw error;
  }
};
