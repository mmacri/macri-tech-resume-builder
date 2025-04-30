
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Force initialize experience data when it's missing
 */
export const forceInitExperience = async () => {
  console.log('Force initializing experience data...');
  
  try {
    // Find the experience section
    const { data: section, error: sectionError } = await supabase
      .from('resume_sections')
      .select('*')
      .ilike('section_name', 'experience')
      .maybeSingle();
    
    if (sectionError) {
      console.error('Error finding experience section:', sectionError);
      toast.error('Error finding experience section');
      throw sectionError;
    }
    
    if (!section) {
      console.error('Experience section not found');
      toast.error('Experience section not found');
      throw new Error('Experience section not found');
    }
    
    // Check if there are already experience items
    const { count, error: countError } = await supabase
      .from('resume_items')
      .select('*', { count: 'exact', head: true })
      .eq('section_id', section.id);
    
    if (countError) {
      console.error('Error checking for experience items:', countError);
      throw countError;
    }
    
    if ((count || 0) > 0) {
      console.log(`Section already has ${count} items, no need to initialize`);
      return { initialized: false, message: 'Experience data already exists' };
    }
    
    console.log('Loading experience data module...');
    // Use dynamic import to load the experience data module
    const { createExperienceData } = await import('./experienceData');
    
    // Create experience data
    await createExperienceData(section.id);
    console.log('Experience data initialized successfully');
    
    return { initialized: true, message: 'Experience data initialized successfully' };
  } catch (error) {
    console.error('Error in forceInitExperience:', error);
    throw error;
  }
};
