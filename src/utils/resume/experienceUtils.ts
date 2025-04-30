
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ExperienceItem } from '@/types/experience';
import { createExperienceData } from './experienceData';

// Helper function to fetch experience items
export const fetchExperienceItems = async (sectionId: string) => {
  console.log('Fetching experience items for section:', sectionId);
  
  const { data, error } = await supabase
    .from('resume_items')
    .select('*')
    .eq('section_id', sectionId)
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching experience items:', error);
    throw error;
  }
  
  console.log('Experience items found:', data?.length || 0);
  if (data && data.length > 0) {
    console.log('First experience item:', data[0]);
  } else {
    console.log('No experience items found for section ID:', sectionId);
  }
  
  return data || [];
};

// Helper function to populate experience items if none exist
export const populateExperienceItems = async (sectionId: string) => {
  console.log('Populating experience items for section:', sectionId);
  
  // Check if there are already items for this section
  const { count, error: countError } = await supabase
    .from('resume_items')
    .select('*', { count: 'exact', head: true })
    .eq('section_id', sectionId);
    
  if (countError) {
    console.error('Error checking for existing experience items:', countError);
    throw countError;
  }
  
  if ((count || 0) > 0) {
    console.log(`Section already has ${count} items, no need to populate`);
    return;
  }
  
  // Use the dedicated function to create experience data
  await createExperienceData(sectionId);
  
  // Fetch again after populating
  const refreshedData = await fetchExperienceItems(sectionId);
  console.log('After populating, found experience items:', refreshedData?.length || 0);
  
  return refreshedData;
};

// Function to find or create the experience section
export const findOrCreateExperienceSection = async () => {
  console.log('Looking for experience section...');
  
  // Try to find the experience section ID
  const { data: sections, error: sectionsError } = await supabase
    .from('resume_sections')
    .select('id, section_name')
    .ilike('section_name', 'experience')
    .maybeSingle();
    
  if (sectionsError) {
    console.error('Error looking up experience section:', sectionsError);
    throw new Error(`Could not find experience section: ${sectionsError.message}`);
  }
  
  if (sections) {
    console.log(`Found experience section ID: ${sections.id} (${sections.section_name})`);
    return sections.id;
  }
  
  console.log('Experience section not found in database. Creating one...');
  
  // Create the experience section if it doesn't exist
  const { data: newSection, error: createError } = await supabase
    .from('resume_sections')
    .insert({ section_name: 'experience', display_order: 2 })
    .select()
    .single();
    
  if (createError) {
    console.error('Error creating experience section:', createError);
    throw new Error(`Failed to create experience section: ${createError.message}`);
  }
  
  console.log('Created new experience section:', newSection);
  return newSection.id;
};
