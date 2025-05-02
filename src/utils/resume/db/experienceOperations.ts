
import { supabase } from '@/integrations/supabase/client';

/**
 * Create experience data in the database
 */
export const createExperienceData = async (sectionId: string) => {
  console.log('Creating experience data for section ID:', sectionId);
  
  if (!sectionId) {
    console.error('No section ID provided to createExperienceData');
    throw new Error('Section ID is required for createExperienceData');
  }
  
  try {
    // First, check if there are already items for this section
    const { count, error: countError } = await supabase
      .from('resume_items')
      .select('*', { count: 'exact', head: true })
      .eq('section_id', sectionId);
      
    if (countError) {
      console.error('Error checking for existing items:', countError);
      throw countError;
    }
    
    if ((count || 0) > 0) {
      console.log(`Section already has ${count} items, skipping creation`);
      return;
    }
  
    // Clear any existing experience items for this section as a safety measure
    const { error: deleteError } = await supabase
      .from('resume_items')
      .delete()
      .eq('section_id', sectionId);
      
    if (deleteError) {
      console.error('Error deleting existing experience items:', deleteError);
      throw deleteError;
    }
    
    // Import experience items from the data file
    const { importExperienceItems } = await import('../data/experienceImporter');
    const experiences = await importExperienceItems(sectionId);
    
    console.log(`Attempting to create ${experiences.length} experience items`);
    
    // Insert each experience one by one to make debugging easier
    for (const experience of experiences) {
      console.log(`Creating experience: ${experience.title}`);
      try {
        const { data, error } = await supabase
          .from('resume_items')
          .insert(experience)
          .select();
          
        if (error) {
          console.error(`Error creating experience data for ${experience.title}:`, error);
          throw error;
        }
        
        console.log(`Successfully created experience: ${experience.title}`);
      } catch (err) {
        console.error(`Failed to create experience item: ${experience.title}`, err);
        throw err;
      }
    }
    
    console.log('Successfully created all experience items');
    
    // Verify that the items were actually created
    const { data: createdItems, error: verifyError } = await supabase
      .from('resume_items')
      .select('*')
      .eq('section_id', sectionId)
      .order('display_order', { ascending: true });
      
    if (verifyError) {
      console.error('Error verifying created items:', verifyError);
    } else {
      console.log(`Verified created items: ${createdItems?.length || 0}`);
      if (createdItems && createdItems.length > 0) {
        console.log('First created item:', createdItems[0]);
      }
    }

    return createdItems;
  } catch (error) {
    console.error('Error in createExperienceData:', error);
    throw error;
  }
};
