
import { supabase } from '@/integrations/supabase/client';
import { createExperienceData } from './experienceData';

interface InitExperienceResult {
  initialized: boolean;
  message?: string;
}

export const forceInitExperience = async (): Promise<InitExperienceResult> => {
  try {
    console.log('Looking for experience section to force initialize items...');
    
    // Find the experience section by name
    const { data: section, error: sectionError } = await supabase
      .from('resume_sections')
      .select('id, section_name')
      .ilike('section_name', 'experience')
      .maybeSingle();
    
    if (sectionError) {
      console.error('Error finding experience section:', sectionError);
      return { 
        initialized: false,
        message: `Error looking up experience section: ${sectionError.message}`
      };
    }
    
    if (!section) {
      console.log('Experience section not found, creating one...');
      
      // Create the experience section if it doesn't exist
      const { data: newSection, error: createError } = await supabase
        .from('resume_sections')
        .insert({ section_name: 'experience', display_order: 2 })
        .select()
        .single();
      
      if (createError) {
        console.error('Error creating experience section:', createError);
        return { 
          initialized: false,
          message: `Failed to create section: ${createError.message}`
        };
      }
      
      console.log('Created experience section:', newSection);
      
      // Now create experience items
      try {
        await createExperienceData(newSection.id);
        console.log('Successfully created experience data for new section');
        return { initialized: true };
      } catch (error) {
        console.error('Error creating experience data:', error);
        return { 
          initialized: false,
          message: `Failed to create experience data: ${error instanceof Error ? error.message : String(error)}`
        };
      }
    }
    
    // Check if there are already experience items
    console.log(`Found experience section: ${section.section_name} (${section.id}), checking for items...`);
    
    const { data: items, error: itemsError, count } = await supabase
      .from('resume_items')
      .select('*', { count: 'exact' })
      .eq('section_id', section.id);
    
    if (itemsError) {
      console.error('Error checking for experience items:', itemsError);
      return { 
        initialized: false,
        message: `Error checking for items: ${itemsError.message}`
      };
    }
    
    const itemCount = count || 0;
    console.log(`Found ${itemCount} experience items`);
    
    // If no items, create them
    if (itemCount === 0) {
      console.log('No experience items found, creating them...');
      try {
        await createExperienceData(section.id);
        console.log('Successfully created experience data');
        return { initialized: true };
      } catch (error) {
        console.error('Error creating experience data:', error);
        return { 
          initialized: false,
          message: `Failed to create experience data: ${error instanceof Error ? error.message : String(error)}`
        };
      }
    }
    
    return { 
      initialized: false,
      message: `Experience items already exist (${itemCount} items found)` 
    };
  } catch (error) {
    console.error('Unexpected error in forceInitExperience:', error);
    return { 
      initialized: false,
      message: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};
