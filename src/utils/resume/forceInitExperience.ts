
import { supabase } from '@/integrations/supabase/client';
import { createExperienceData } from './experienceData';
import { toast } from 'sonner';

/**
 * Force initialize experience data if it doesn't exist
 * @returns Promise with initialization status
 */
export const forceInitExperience = async (): Promise<{ initialized: boolean; message?: string }> => {
  try {
    console.log('Attempting to force initialize experience data...');
    
    // Check for experience section
    const { data: experienceSection, error: sectionError } = await supabase
      .from('resume_sections')
      .select('id')
      .ilike('section_name', 'experience')
      .maybeSingle();
      
    if (sectionError) {
      console.error('Error finding experience section:', sectionError);
      return { 
        initialized: false,
        message: `Database error: ${sectionError.message}`
      };
    }
    
    // If no experience section, create it
    if (!experienceSection) {
      console.log('No experience section found, creating one...');
      
      const { data: newSection, error: createError } = await supabase
        .from('resume_sections')
        .insert({ section_name: 'experience', display_order: 2 })
        .select()
        .single();
        
      if (createError) {
        console.error('Error creating experience section:', createError);
        return { 
          initialized: false,
          message: `Failed to create experience section: ${createError.message}`
        };
      }
      
      console.log('Created new experience section:', newSection);
      
      // Create experience items for the new section
      try {
        await createExperienceData(newSection.id);
        console.log('Successfully created experience data for new section');
        return { 
          initialized: true,
          message: 'Successfully created experience section and data'
        };
      } catch (dataError) {
        console.error('Error creating experience data:', dataError);
        return { 
          initialized: false,
          message: `Failed to create experience data: ${dataError instanceof Error ? dataError.message : 'Unknown error'}`
        };
      }
    }
    
    // If section exists, check for items
    const { count, error: countError } = await supabase
      .from('resume_items')
      .select('*', { count: 'exact', head: true })
      .eq('section_id', experienceSection.id);
      
    if (countError) {
      console.error('Error checking for experience items:', countError);
      return { 
        initialized: false,
        message: `Database error: ${countError.message}`
      };
    }
    
    if ((count || 0) === 0) {
      console.log('Experience section exists but has no items, creating data...');
      
      try {
        await createExperienceData(experienceSection.id);
        console.log('Successfully created experience data for existing section');
        return { 
          initialized: true,
          message: 'Successfully added experience data to existing section'
        };
      } catch (dataError) {
        console.error('Error creating experience data:', dataError);
        return { 
          initialized: false,
          message: `Failed to create experience data: ${dataError instanceof Error ? dataError.message : 'Unknown error'}`
        };
      }
    }
    
    console.log(`Experience section already has ${count} items, no initialization needed`);
    return {
      initialized: false,
      message: 'Experience data already exists'
    };
    
  } catch (error) {
    console.error('Error in forceInitExperience:', error);
    return {
      initialized: false,
      message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};
