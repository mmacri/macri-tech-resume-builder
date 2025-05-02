
import { supabase } from '@/integrations/supabase/client';
import { experienceItems } from '../data/experienceItems';
import { toast } from 'sonner';

/**
 * Create experience data in the database
 */
export const createExperienceData = async (sectionId: string) => {
  try {
    if (!sectionId) {
      throw new Error('Section ID is required to create experience data');
    }
    
    console.log(`Creating experience data for section ID: ${sectionId}`);
    
    // Check if section exists
    const { data: section, error: sectionError } = await supabase
      .from('resume_sections')
      .select('*')
      .eq('id', sectionId)
      .single();
      
    if (sectionError) {
      console.error('Error checking experience section:', sectionError);
      throw sectionError;
    }
    
    if (!section) {
      throw new Error(`Experience section with ID ${sectionId} not found`);
    }
    
    console.log('Found experience section:', section);
    
    // First, check if items already exist for this section
    const { count, error: countError } = await supabase
      .from('resume_items')
      .select('*', { count: 'exact', head: true })
      .eq('section_id', sectionId);
      
    if (countError) {
      console.error('Error checking existing experience items:', countError);
      throw countError;
    }
    
    if ((count || 0) > 0) {
      console.log(`Experience section already has ${count} items, skipping creation`);
      return { success: true, message: 'Experience items already exist', count };
    }
    
    // No items found, create them
    console.log('No experience items found, creating new items');
    
    // Map items to include section_id
    const itemsWithSectionId = experienceItems.map(item => ({
      ...item,
      section_id: sectionId
    }));
    
    console.log(`Preparing to insert ${itemsWithSectionId.length} experience items`);
    
    // Insert all items
    const { data: insertedItems, error: insertError } = await supabase
      .from('resume_items')
      .insert(itemsWithSectionId)
      .select();
      
    if (insertError) {
      console.error('Error inserting experience items:', insertError);
      throw insertError;
    }
    
    console.log(`Successfully created ${insertedItems?.length || 0} experience items`);
    
    return { 
      success: true, 
      message: `Created ${insertedItems?.length || 0} experience items`, 
      items: insertedItems 
    };
  } catch (error) {
    console.error('Error in createExperienceData:', error);
    toast.error(`Failed to create experience data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};
